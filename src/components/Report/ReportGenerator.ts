import { CustomerBookRequest, Sales } from "@prisma/client";
import { jsPDF } from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

export function createSearchReport({
	searchData,
}: {
	searchData: Array<IScannedBookLayout>;
}) {
	const doc = new jsPDF();
	const TableBody: RowInput[] = [];

	searchData.forEach((book) => {
		const bookData = [
			book.isbn,
			book.title,
			book.author,
			new Date(book.createdAt).toLocaleDateString("en-AU"),
		];
		TableBody.push(bookData);
	});

	doc.text(`Search Printout`, 80, 10);
	autoTable(doc, {
		styles: { fillColor: "#fff", textColor: "#828282", lineColor: "#fff" },
		headStyles: { fillColor: "#fff", textColor: "#828282", lineColor: "#fff" },
		bodyStyles: { fillColor: "#fff", textColor: "#828282", lineColor: "#fff" },
		alternateRowStyles: {
			fillColor: "#fff",
			textColor: "#828282",
			lineColor: "#fff",
		},
		head: [["ISBN", "Title", "Author", "Scanned Date"]],
		body: TableBody,
	});

	doc.autoPrint();
	doc.output("dataurlnewwindow");
}

export function createSalesReport({
	reportData,
	selectedDates,
}: {
	reportData: any;
	selectedDates: Array<Date>;
}) {
	const doc = new jsPDF();
	const TableBody: RowInput[] = [];

	Object.keys(reportData).forEach(function (key, index) {
		TableBody.push([key]);
		reportData[key].forEach((book: Sales) => {
			const bookData = [
				book.isbn,
				book.title,
				book.author,
				new Date(book.createdAt).toLocaleDateString("en-AU"),
			];
			TableBody.push(bookData);
		});
	});

	doc.text(`Scanned Off Books`, 100, 10, { align: "center" });
	doc
		.setFontSize(10)
		.text(
			`${selectedDates[0].toLocaleDateString(
				"en-AU"
			)} - ${selectedDates[1].toLocaleDateString("en-AU")}`,
			100,
			14,
			{ align: "center" }
		);

	autoTable(doc, {
		margin: { top: 18 },
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

	doc.autoPrint();
	doc.output("dataurlnewwindow");
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
			bookGenre,
		} = customer;

		const customerData = [
			customerName,
			customerPhoneNumber,
			bookTitle,
			bookAuthor,
			bookISBN,
			bookGenre,
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

	doc.autoPrint();
	doc.output("dataurlnewwindow");
}
