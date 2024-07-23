"use server";
import { prisma } from "@/db";
import { NextResponse } from "next/server";

// Add Customer Request
export async function POST(request: Request) {
	const req = await request.json();
	let {
		customerName,
		customerPhoneNumber,
		bookTitle,
		bookAuthor,
		bookGenre,
		bookISBN,
	} = req;

	try {
		const customerBookRequest = await prisma.customerBookRequest.create({
			data: {
				customerName: customerName,
				customerPhoneNumber: customerPhoneNumber,
				bookTitle: bookTitle,
				bookAuthor: bookAuthor,
				bookGenre: bookGenre,
				bookISBN: bookISBN,
			},
		});

		return NextResponse.json(customerBookRequest);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed Adding Book Request..." },
			{ status: 500 }
		);
	}
}

// Search Customer Requests
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const searchTerm = searchParams.get("search");

	if (searchTerm === null) {
		return NextResponse.json(
			{ error: "No Search Entered..." },
			{ status: 500 }
		);
	}

	try {
		const customerResults = await prisma.customerBookRequest.findMany({
			where: {
				OR: [
					{
						customerName: {
							contains: searchTerm,
						},
					},
					{
						customerPhoneNumber: {
							contains: searchTerm,
						},
					},
					{
						bookTitle: {
							contains: searchTerm,
						},
					},
					{
						bookAuthor: {
							contains: searchTerm,
						},
					},
					{
						bookISBN: {
							contains: searchTerm,
						},
					},
				],
			},
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(customerResults);
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Failed Finding Customer Request by Search..." },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);

	const id = searchParams.get("id");

	if (id) {
		try {
			const deletedCustomer = await prisma.customerBookRequest.delete({
				where: {
					id: Number(id),
				},
			});

			return NextResponse.json(deletedCustomer);
		} catch (error: any) {
			return NextResponse.json(
				{ error: "Failed Removing Customer Request by ID..." },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json(
		{ error: "I'm a little teapot, cannot handle that method." },
		{ status: 418 }
	);
}
