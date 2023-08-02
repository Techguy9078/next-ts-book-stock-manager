import { CustomerBookRequest, Sales } from "@prisma/client";
import { jsPDF } from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

export function createSalesReport({
	reportData,
	selectedDates,
}: {
	reportData: Array<Sales>;
	selectedDates: Array<Date>;
}) {
	const doc = new jsPDF();
	const TableBody: RowInput[] = [];

	reportData.forEach((book) => {
		const bookData = [
			book.isbn,
			book.title,
			book.author,
			new Date(book.createdAt).toLocaleDateString("en-AU"),
		];
		TableBody.push(bookData);
	});

	doc.text(`Scanned Off Books`, 80, 10);
	autoTable(doc, {
		styles: { fillColor: "#fff", textColor: "#828282", lineColor: "#fff" },
		headStyles: { fillColor: "#fff", textColor: "#828282", lineColor: "#fff" },
		bodyStyles: { fillColor: "#fff", textColor: "#828282", lineColor: "#fff" },
		alternateRowStyles: {
			fillColor: "#fff",
			textColor: "#828282",
			lineColor: "#fff",
		},
		head: [["ISBN", "Title", "Author", "Scanned Off"]],
		body: TableBody,
	});

	doc.save(
		`salesreport_${selectedDates[0]
			.toLocaleDateString("en-AU")
			.replaceAll("/", "_")}_to_${selectedDates[1]
			.toLocaleDateString("en-AU")
			.replaceAll("/", "_")}.pdf`
	);
}

export function createCustomerRequestsReport({
	reportData,
	selectedDates,
}: {
	reportData: Array<CustomerBookRequest>;
	selectedDates: Array<Date>;
}) {
	const doc = new jsPDF();
	const TableBody: RowInput[] = [];

	reportData.forEach((customer) => {
		const {
			customerName,
			customerPhoneNumber,
			createdAt,
			bookTitle,
			bookAuthor,
			bookISBN,
		} = customer;

		const customerData = [
			customerName,
			customerPhoneNumber,
			bookTitle,
			bookAuthor,
			bookISBN,
			new Date(createdAt).toLocaleDateString(),
		];
		TableBody.push(customerData);
	});

	doc.text("Customer Requests Report", 80, 10);
	autoTable(doc, {
		styles: { fillColor: "#fff", textColor: "#828282", lineColor: "#fff" },
		headStyles: { fillColor: "#fff", textColor: "#828282", lineColor: "#fff" },
		bodyStyles: { fillColor: "#fff", textColor: "#828282", lineColor: "#fff" },
		alternateRowStyles: {
			fillColor: "#fff",
			textColor: "#828282",
			lineColor: "#fff",
		},
		head: [["Name", "Phone", "Title", "Author", "ISBN", "Added Date"]],
		body: TableBody,
	});

	doc.save(
		`customer_requests_report_${selectedDates[0]
			.toLocaleDateString()
			.replaceAll("/", "_")}_to_${selectedDates[1]
			.toLocaleDateString()
			.replaceAll("/", "_")}.pdf`
	);
}
