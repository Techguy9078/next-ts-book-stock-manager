"use server";
import { prisma } from "@/db";
import { NextResponse } from "next/server";

// Add Customer Request
export async function POST(request: Request) {
	const req = await request.json();
	let { customerName, customerPhoneNumber, bookTitle, bookAuthor, bookISBN } =
		req;
	try {
		const customerBookRequest = await prisma.customerBookRequest.create({
			data: {
				customerName: customerName,
				customerPhoneNumber: customerPhoneNumber,
				bookTitle: bookTitle,
				bookAuthor: bookAuthor,
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
	const fullSearchTerm = searchParams.get("fullSearch");
	const autoSearchTerm = searchParams.get("autoSearchTerm");

	if (autoSearchTerm) {
		try {
			const customerResults = await prisma.customerBookRequest.findMany({
				where: {
					OR: [
						{
							bookTitle: {
								contains: autoSearchTerm,
							},
						},
						{
							bookAuthor: {
								contains: autoSearchTerm,
							},
						},
						{
							bookISBN: {
								contains: autoSearchTerm,
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

	if (fullSearchTerm) {
		try {
			const customerResults = await prisma.customerBookRequest.findMany({
				where: {
					OR: [
						{
							customerName: {
								contains: fullSearchTerm,
							},
						},
						{
							customerPhoneNumber: {
								contains: fullSearchTerm,
							},
						},
						{
							bookTitle: {
								contains: fullSearchTerm,
							},
						},
						{
							bookAuthor: {
								contains: fullSearchTerm,
							},
						},
						{
							bookISBN: {
								contains: fullSearchTerm,
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

	return NextResponse.json(
		{ error: "No Search Term Entered..." },
		{ status: 500 }
	);
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
