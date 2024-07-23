"use server";
import { normalizeAccents } from "@/app/api/BookAPI/CustomAPIBookSearch/_helpers/helpers";
import { CustomerBookRequest } from "@prisma/client";

/**
 * Parses the Customer Request Entry for local database
 * @param data form customer data
 * @returns CustomerData in local database layout
 */
export default async function CustomerDataParse(
	data: CustomerBookRequest
): Promise<ICustomerBookRequest> {
	let customerObject: Prettify<ICustomerBookRequest> = {
		customerName: "",
		customerPhoneNumber: "",
		bookTitle: null,
		bookAuthor: null,
		bookGenre: null,
		bookISBN: null,
		comments: null,
	};

	return customerObject;
}
