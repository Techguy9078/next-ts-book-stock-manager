"use server";
//import { normalizeAccents } from "@/app/api/BookAPI/CustomAPIBookSearch/_helpers/helpers";
import { AxiosResponse } from "axios";

// TODO remove - tempf ro testing
const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

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
    genre: "n/a",
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

  //let title = await normalizeAccents(bookData.title);
  let title = removeAccents(bookData.title);
  if (!title) throw Error();

  bookObject.title = title;
  bookObject.author = bookData.authors
    .map((author: any) => author.name)
    .join(", ");

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
    genre: "",
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

  //bookObject.title = await normalizeAccents(bookData.title);
  bookObject.title = removeAccents(bookData.title);
  bookObject.author = bookData.authors.map((author: any) => author).join(", ");

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
    genre: "",
  };

  bookObject.barcode = data.barcode;
  bookObject.isbn = data.isbn;
  bookObject.title = data.title;
  bookObject.author = data.author;
  bookObject.genre = data.genre;

  return bookObject;
}
