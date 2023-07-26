"use server";
import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const dateSales = await prisma.salesStats.findMany({
			take: 10,
			orderBy: { date: "desc" },
		});

		return NextResponse.json(dateSales);
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Failed Getting Sale Stats..." },
			{ status: 500 }
		);
	}
}

interface IPutReq {
	updateField: "addBook" | "removeBook";
}

export async function PUT(request: Request) {
	const { updateField }: IPutReq = await request.json();
	const localDate = new Date().toLocaleDateString();

	if (updateField == "addBook") {
		try {
			const updateStatCount = await prisma.salesStats.upsert({
				where: {
					date: localDate,
				},
				update: {
					addedBooks: { increment: 1 },
				},
				create: {
					date: localDate,
					addedBooks: 1,
					removedBooks: 0,
				},
			});

			return NextResponse.json(updateStatCount);
		} catch (error: any) {
			return NextResponse.json(
				{ error: "Failed Updating Add Sale Stats..." },
				{ status: 500 }
			);
		}
	}
	if (updateField == "removeBook") {
		try {
			const updateStatCount = await prisma.salesStats.upsert({
				where: {
					date: localDate,
				},
				update: {
					removedBooks: { increment: 1 },
				},
				create: {
					date: localDate,
					addedBooks: 0,
					removedBooks: 1,
				},
			});

			return NextResponse.json(updateStatCount);
		} catch (error: any) {
			return NextResponse.json(
				{ error: "Failed Updating Remove Sale Stats..." },
				{ status: 500 }
			);
		}
	}
	return NextResponse.json(
		{ error: "I'm a little teapot, cannot handle that field." },
		{ status: 418 }
	);
}
