import { Sales } from "@prisma/client";
import { jsPDF } from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

export default function createReport({
	reportData,
	selectedDates,
}: {
	reportData: Array<Sales>;
	selectedDates: Array<Date>;
}) {
	const doc = new jsPDF();
	const TableBody: RowInput[] = [];

	reportData.forEach((book) => {
		const ticketData = [
			book.isbn,
			book.title,
			book.author,
			new Date(book.createdAt).toLocaleDateString(),
		];
		// push each tickcet's info into a row
		TableBody.push(ticketData);
	});
	doc.text("Scanned Off Books", 80, 10);

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
			.toLocaleDateString()
			.replaceAll("/", "_")}_to_${selectedDates[1]
			.toLocaleDateString()
			.replaceAll("/", "_")}.pdf`
	);
}
