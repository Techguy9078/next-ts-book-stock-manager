"use server";
import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const req = await request.json();
	let { barcode, isbn, title, author, bookDetails } = req;
	if (typeof barcode == "number") {
		barcode = barcode.toString();
	}
	try {
		const combinedBookData = await prisma.scannedBook.create({
			data: {
				book: {
					connectOrCreate: {
						where: {
							barcode: barcode,
						},
						create: {
							barcode: barcode,
							isbn: isbn,
							title: title,
							author: author,
							bookDetails: bookDetails,
						},
					},
				},
			},
		});

		return NextResponse.json(combinedBookData);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed Adding Local Book..." },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const searchTerm = searchParams.get("search");

	if (searchTerm === null) {
		return NextResponse.json(
			{ error: "No Search Term Entered..." },
			{ status: 500 }
		);
	}

	try {
		const bookResults = await prisma.scannedBook.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: "insensitive",
						},
					},
					{
						author: {
							contains: searchTerm,
							mode: "insensitive",
						},
					},
					{
						barcode: {
							contains: searchTerm,
						},
					},
					{
						isbn: {
							contains: searchTerm,
						},
					},
				],
			},
			orderBy: { title: "asc" },
		});

		return NextResponse.json(bookResults);
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Failed Finding Local Book..." },
			{ status: 500 }
		);
	}
}

export async function PATCH(request: Request) {
	
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);

	const barcode = searchParams.get("barcode");
	const id = searchParams.get("id");

	if (barcode) {
		try {
			const bookResult = await prisma.scannedBook.findMany({
				where: {
					barcode: barcode.toString(),
				},
				orderBy: {
					createdAt: "asc",
				},
			});

			const deleteBook = await prisma.scannedBook.delete({
				where: {
					id: bookResult[0].id,
				},
			});

			return NextResponse.json(deleteBook);
		} catch (error: any) {
			return NextResponse.json(
				{ error: "Failed Removing Book By Barcode..." },
				{ status: 500 }
			);
		}
	}
	if (id) {
		try {
			const deleteBook = await prisma.scannedBook.delete({
				where: {
					id: Number(id),
				},
			});

			return NextResponse.json(deleteBook);
		} catch (error: any) {
			return NextResponse.json(
				{ error: "Failed Removing Book By ID..." },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json(
		{ error: "I'm a little teapot, cannot handle that method." },
		{ status: 418 }
	);
}
