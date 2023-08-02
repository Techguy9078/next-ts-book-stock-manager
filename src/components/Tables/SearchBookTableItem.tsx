import { Button, Tbody, Td, Tr, useColorModeValue } from "@chakra-ui/react";
import { ScannedBook } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

export default function BookTableItem({
	book,
	handleRefetch,
}: {
	book: IScannedBookLayout;
	handleRefetch: Function;
}) {
	const [loading, setLoading] = useState(false);

	const { id, isbn, title, author, bookDetails, createdAt } = book;

	async function removeBook() {
		setLoading(true);
		await axios.delete(`/api/BookAPI/Book?id=${id}`);
		handleRefetch();

		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}

	const date = new Date(createdAt);
	const formattedDate =
		date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getFullYear();
	return (
		<Tbody
			key={id}
			borderStyle={"solid"}
			borderWidth={2}
			borderColor={useColorModeValue("gray.300", "gray.800")}
		>
			<Tr>
				<Td
					sx={{
						"@media screen and (max-width: 600px)": {
							fontWeight: "bold",
							display: "flex",
							maxWidth: "80vw",
						},
					}}
				>
					{isbn}
				</Td>
				<Td
					sx={{
						"@media screen and (max-width: 600px)": {
							display: "flex",
							maxWidth: "80vw",
						},
					}}
				>
					{title}
				</Td>
				<Td
					sx={{
						"@media screen and (max-width: 600px)": {
							display: "flex",
							maxWidth: "80vw",
						},
					}}
				>
					{author}
				</Td>
				<Td
					sx={{
						"@media screen and (max-width: 600px)": {
							display: "flex",
							maxWidth: "80vw",
						},
					}}
				>
					{bookDetails}
				</Td>
				<Td
					sx={{
						"@media screen and (max-width: 600px)": {
							display: "flex",
							maxWidth: "80vw",
						},
					}}
				>
					{formattedDate}
				</Td>
				<Td
					sx={{
						"@media screen and (max-width: 600px)": {
							display: "flex",
							maxWidth: "80vw",
						},
					}}
				>
					<Button
						isLoading={loading}
						loadingText={"Removing Book..."}
						className={"bg-red-400"}
						color={"white"}
						_hover={{
							bgColor: "red.600",
							color: useColorModeValue("gray.300", "gray.300"),
						}}
						w={"100%"}
						size="lg"
						px={10}
						mt={2}
						onClick={removeBook}
					>
						Remove
					</Button>
				</Td>
			</Tr>
		</Tbody>
	);
}
