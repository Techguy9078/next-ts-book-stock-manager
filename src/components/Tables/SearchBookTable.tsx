import {
	Box,
	Table,
	Tbody,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import BookTableItem from "./SearchBookTableItem";

export default function BookTable({
	bookArray,
	handleRefetch,
}: {
	bookArray: Array<IScannedBookLayout>;
	handleRefetch: Function;
}) {
	return (
		<Box
			overflowY={"scroll"}
			maxHeight={"50vh"}
			fontSize={{ sm: "sm", md: "md" }}
			sx={{
				"::-webkit-scrollbar": {
					width: "8px",
				},
				"::-webkit-scrollbar-track": {
					bgColor: useColorModeValue("gray.300", "gray.600"),
					borderRadius: "100px",
				},
				"::-webkit-scrollbar-thumb": {
					bgColor: useColorModeValue("gray.400", "gray.800"),
					borderRadius: "100px",
				},
			}}
		>
			<Table size="md">
				<Thead
					borderWidth={2}
					borderColor={useColorModeValue("gray.300", "gray.600")}
					position={"sticky"}
					top={-0.5}
					zIndex={2}
					sx={{
						"@media screen and (max-width: 600px)": {
							display: "none",
						},
					}}
				>
					<Tr>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>ISBN</Th>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>Title</Th>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>Author</Th>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>
							Book Details
						</Th>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>
							Scanned Date
						</Th>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>Delete</Th>
					</Tr>
				</Thead>
				{!bookArray.length && (
					<Tbody>
						<Tr>
							<Th>
								Unfortunately couldn&apos;t find any books by that search, maybe
								try typing more or a different search...
							</Th>
						</Tr>
					</Tbody>
				)}

				{bookArray.length > 0 &&
					bookArray.map((book) => (
						<BookTableItem
							key={book.id}
							book={book}
							handleRefetch={handleRefetch}
						/>
					))}

				{/* <Tfoot>
					<Tr>
					<Th>Barcode</Th>
					<Th>ISBN</Th>
					<Th>Title</Th>
					<Th>Author</Th>
					<Th>Year</Th>
					<Th>Publisher</Th>
						<Th>Scanned Date</Th>
					</Tr>
				</Tfoot> */}
			</Table>
		</Box>
	);
}
