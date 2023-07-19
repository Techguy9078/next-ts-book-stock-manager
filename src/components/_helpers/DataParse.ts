"use server";
import { normalizeAccents } from "@/app/api/BookAPI/CustomAPIBookSearch/_helpers/helpers";
import { AxiosResponse } from "axios";

/**
 * Parses the OL Book Data for local database
 * @param {AxiosResponse<any, any>} result the returned object from OL Book API
 * @param {string} barcode the barcode of the book
 * @returns BookObject in local database layout
 */
export async function BookDataParseOL(
	result: AxiosResponse<any, any>,
	barcode: string
): Promise<IScannedBookLayout> {
	const bookData = result.data[`ISBN:${barcode}`];

	let bookObject: IScannedBookLayout = {
		barcode: "",
		isbn: "",
		title: "",
		author: "",
		year: "",
		publisher: "",
	};

	bookObject.barcode = barcode.toString();
	bookObject.isbn = bookData.identifiers.isbn_13[0];
	bookObject.title = await normalizeAccents(bookData.title);
	bookObject.author = bookData.authors
		.map((author: any) => author.name)
		.join(", ");

	if (typeof bookData.publish_date == "object") {
		if (Number(bookData.publish_date[0])) {
			Number(bookData.publish_date[0]) < 3000
				? (bookObject.year = bookData.publish_date[0].replaceAll(" ", ""))
				: (bookObject.year = "");
		} else {
			bookObject.year = Number(bookData.publish_date[0].split(",")[0])
				? bookData.publish_date.split(",")[0].replaceAll(" ", "")
				: bookData.publish_date.split(",")[1].replaceAll(" ", "");
		}
	} else {
		if (Number(bookData.publish_date)) {
			Number(bookData.publish_date) < 3000
				? (bookObject.year = bookData.publish_date.replaceAll(" ", ""))
				: (bookObject.year = "");
		} else {
			bookObject.year = Number(bookData.publish_date.split(",")[0])
				? bookData.publish_date.split(",")[0].replaceAll(" ", "")
				: bookData.publish_date.split(",")[1].replaceAll(" ", "");
		}
	}

	if (bookData.publishers) {
		bookObject.publisher = bookData.publishers
			.map((publisher: any) => publisher.name)
			.join(", ");
	} else {
		bookObject.publisher = "";
	}

	return bookObject;
}

/**
 * Parses the Manual Entry Book Data for local database
 * @param data the manually entered data
 * @returns BookObject in local database layout
 */
export async function ManualBookDataParse(
	data: IScannedBookLayout
): Promise<IScannedBookLayout> {
	let bookObject: IScannedBookLayout = {
		barcode: "",
		isbn: "",
		title: "",
		author: "",
		year: "",
		publisher: "",
	};

	bookObject.barcode = data.barcode;
	bookObject.isbn = data.isbn;
	bookObject.title = data.title;
	bookObject.author = data.author;
	bookObject.year = data.year;
	bookObject.publisher = data.publisher;

	return bookObject;
}
