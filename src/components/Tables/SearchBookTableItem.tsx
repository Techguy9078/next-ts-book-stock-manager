import { Button, Tbody, Td, Tr, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function BookTableItem({
	book,
	handleRerender,
}: {
	book: any;
	handleRerender: Function;
}) {
	const [loading, setLoading] = useState(false);

	const { bookID, barcode, title, author, year, publisher, createdAt } =
		book;

	async function removeBook() {
		setLoading(true);
		await axios.delete(`/api/BookAPI/Book?bookID=${bookID}`);
		handleRerender();

		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}

	const date = new Date(createdAt);
	const formattedDate =
		date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getFullYear();
	return (
		<Tbody
			key={bookID}
			borderStyle={"solid"}
			borderWidth={2}
			borderColor={useColorModeValue("gray.300", "gray.800")}
		>
			<Tr>
				<Td>{barcode}</Td>
				<Td>{title}</Td>
				<Td>{author}</Td>
				<Td>{year}</Td>
				<Td>{publisher}</Td>
				<Td>{formattedDate}</Td>
				<Td>
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
