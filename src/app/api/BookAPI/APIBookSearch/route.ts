"use server";
import { Chatbot } from "@/components/BardAPI/BardAPI";
import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { BookDataParseOL } from "@/components/_helpers/DataParse";

const sessionId = process.env.Secure1PSID!;

// Trial ISBN 9781845967888
// Another Trial ISBN 9780007276721

// http://openlibrary.org/api/volumes/brief/isbn/${barcode}.json
// http://openlibrary.org/api/volumes/brief/isbn/9781957779072.json

//
// https://openlibrary.org/api/books?bibkeys=ISBN:${barcode}&jscmd=data&format=json

async function OLAPISearch(barcode: string): Promise<AxiosResponse<any, any>> {
	const result = await axios.get(
		`https://openlibrary.org/api/books?bibkeys=ISBN:${barcode}&jscmd=data&format=json`
	);
	return result;
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const barcode = searchParams.get("barcode");

	if (barcode === null) {
		return NextResponse.json(
			{ error: "No Barcode Provided Finding Book Using API..." },
			{ status: 500 }
		);
	}

	try {
		const bookResults = await prisma.storedBooks.findUnique({
			where: {
				barcode: barcode,
			},
		});
		if (!bookResults) {
			throw Error();
		}
		return NextResponse.json(bookResults);
	} catch {
		console.log("Could Not Find Book In Local Database...");
		try {
			const result = await OLAPISearch(barcode);
			const BookDataOLParsed = await BookDataParseOL(result, barcode);
			return NextResponse.json(BookDataOLParsed);
		} catch (error: any) {
			return NextResponse.json(
				{ error: "Failed Finding Book Using API..." },
				{ status: 500 }
			);
		}
	}
}

// try {
// 	throw Error;
// 	const chatbot = new Chatbot(sessionId);
// 	let response = await chatbot.ask(
// 		`I'm a librarian, give the book with the isbn being ${barcode}, and return book in this JSON model { barcode: string isbn: string title: string author: string year: string publisher: string}`
// 	);

// 	let jsonBook = JSON.parse(response.split("```")[1].slice(4));
// 	return { status: 200, data: jsonBook };
// } catch (error) {
// 	return NextResponse.json(
// 		{ error: "Internal Server Error" },
// 		{ status: 500 }
// 	);
// }
