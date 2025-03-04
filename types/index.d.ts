declare interface IScannedBookLayout {
  id: int | string;
  barcode: string;
  isbn: string;
  title: string;
  author: string;
  genre: string;
  createdAt?: DateTime;
  park?: boolean;
}

declare interface IStoredBookLayout {
  barcode: string;
  isbn: string;
  title: string;
  author: string;
  genre: string;
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
  bookGenre: string | null;
  comments: string | null;
}
