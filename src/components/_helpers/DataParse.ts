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
		bookDetails: "",
	};

	bookObject.barcode = barcode.toString();

	if (bookData.identifiers.isbn_10[0]) {
		bookObject.isbn = bookData.identifiers.isbn_10[0];
	} else {
		if (bookData.identifiers.isbn_13[0]) {
			bookObject.isbn = bookData.identifiers.isbn_13[0];
		} else {
			bookObject.isbn = barcode.toString();
		}
	}

	let title = await normalizeAccents(bookData.title);

	if (!title) throw Error();

	bookObject.title = title;
	bookObject.author = bookData.authors
		.map((author: any) => author.name)
		.join(", ");

	let bookDetailsArray = [];

	if (typeof bookData.publish_date == "object") {
		if (Number(bookData.publish_date[0])) {
			if (Number(bookData.publish_date[0]) < 3000) {
				bookDetailsArray.push(bookData.publish_date[0].replaceAll(" ", ""));
			}
		} else {
			if (Number(bookData.publish_date[0].split(",")[0])) {
				bookDetailsArray.push(
					bookData.publish_date.split(",")[0].replaceAll(" ", "")
				);
			}
		}
	} else {
		if (Number(bookData.publish_date)) {
			if (Number(bookData.publish_date) < 3000) {
				bookDetailsArray.push(bookData.publish_date.replaceAll(" ", ""));
			}
		} else {
			if (Number(bookData.publish_date.split(",")[0])) {
				bookDetailsArray.push(
					bookData.publish_date.split(",")[0].replaceAll(" ", "")
				);
			}
		}
	}

	if (bookData.publishers) {
		bookDetailsArray.push(
			bookData.publishers.map((publisher: any) => publisher.name).join(", ")
		);
	}

	if (!bookDetailsArray.length) {
		bookObject.bookDetails = "n/a";
	} else {
		bookObject.bookDetails = bookDetailsArray.join(", ");
	}

	return bookObject;
}

/**
 * Parses the Google API Book Data for local database
 * @param {AxiosResponse<any, any>} result the returned object from Google Book API
 * @param {string} barcode the barcode of the book
 * @returns BookObject in local database layout
 */
export async function BookDataParseGoogleAPI(
	result: AxiosResponse<any, any>,
	barcode: string
): Promise<IScannedBookLayout> {
	const bookData = result.data.items[0].volumeInfo;

	let bookObject: IScannedBookLayout = {
		barcode: "",
		isbn: "",
		title: "",
		author: "",
		bookDetails: "",
	};

	bookObject.barcode = barcode.toString();

	if (
		bookData.industryIdentifiers.filter(
			(identifier: any) => identifier.type == "ISBN_10"
		).length
	) {
		bookObject.isbn = bookData.industryIdentifiers.filter(
			(identifier: any) => identifier.type == "ISBN_10"
		)[0].identifier;
	} else {
		if (
			bookData.industryIdentifiers.filter(
				(identifier: any) => identifier.type == "ISBN_13"
			).length
		) {
			bookObject.isbn = bookData.industryIdentifiers.filter(
				(identifier: any) => identifier.type == "ISBN_13"
			)[0].identifier;
		} else {
			bookObject.isbn = barcode.toString();
		}
	}

	bookObject.title = await normalizeAccents(bookData.title);
	bookObject.author = bookData.authors.map((author: any) => author).join(", ");

	let bookDetailsArray = [];

	if (Number(bookData.publishedDate)) {
		if (Number(bookData.publishedDate) < 3000) {
			bookDetailsArray.push(bookData.publishedDate.replaceAll(" ", ""));
		}
	} else {
		if (Number(bookData.publishedDate.split("-")[0])) {
			bookDetailsArray.push(
				bookData.publishedDate.split("-")[0].replaceAll(" ", "")
			);
		}
	}

	if (bookData.publisher) {
		bookDetailsArray.push(bookData.publisher);
	}

	if (bookDetailsArray.length) {
		bookObject.bookDetails = bookDetailsArray.join(", ");
	} else {
		bookObject.bookDetails = "n/a";
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
		bookDetails: "",
	};

	bookObject.barcode = data.barcode;
	bookObject.isbn = data.isbn;
	bookObject.title = data.title;
	bookObject.author = data.author;
	bookObject.bookDetails = data.bookDetails;

	return bookObject;
}
