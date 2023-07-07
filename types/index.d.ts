declare interface IScannedBookLayout {
	bookID?: Int;
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
