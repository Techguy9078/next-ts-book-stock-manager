declare interface IScannedBookLayout {
	id?: Int;
	barcode: string;
	isbn: string;
	title: string;
	author: string;
	year: string;
	publisher: string;
	createdAt?: DateTime;
}

declare interface IStoredBookLayout {
	barcode: string;
	isbn: string;
	title: string;
	author: string;
	year: string;
	publisher: string;
}

declare interface IBookResultLayout {
	status: number;
	data: BookLayout | undefined;
}

declare type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

declare interface ICustomerBookRequest {
	id?: int;
	customerName: string;
	customerPhoneNumber: string;
	bookTitle: string | null;
	bookAuthor: string | null;
	bookISBN: string | null;
	comments: string | null;
}
