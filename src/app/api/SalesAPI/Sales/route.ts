"use server";
import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const req = await request.json();
	const { isbn, title, author } = req;
	try {
		const updateStatCount = await prisma.sales.create({
			data: {
				isbn: isbn,
				title: title,
				author: author,
			},
		});

		return NextResponse.json(updateStatCount);
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Failed Updating Add Sale..." },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const startDate = searchParams.get("startDate");
	const endDate = searchParams.get("endDate");

	if (startDate === null || endDate === null) {
		return NextResponse.json(
			{ error: "Failed Finding Sales Report..." },
			{ status: 500 }
		);
	}

	function ParseStartDate(date: string) {
		let newStartDate = new Date(date);
		newStartDate.setHours(1);
		return newStartDate.toISOString();
	}

	function ParseEndDate(date: string) {
		let newEndDate = new Date(date);
		newEndDate.setHours(23);
		return newEndDate.toISOString();
	}

	// On how to do the date selection...
	//
	// LTE: Less Than or Equal to
	// Symbol of Less Than or Equal to <=
	//
	// GT: Greater Than
	// Symbol of Greater Than >
	//
	// GTE: Greater Than or Equal to
	// Symbol of Greater Than or Equal to >=
	//
	// https://github.com/prisma/prisma/discussions/11443#discussioncomment-4095465

	try {
		const salesResults = await prisma.sales.findMany({
			where: {
				createdAt: {
					gte: ParseStartDate(startDate),
					lte: ParseEndDate(endDate),
				},
			},
		});

		return NextResponse.json(salesResults);
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Failed Finding Sales Report..." },
			{ status: 500 }
		);
	}
}
