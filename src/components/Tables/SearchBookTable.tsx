import {
	Table,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import BookTableItem from "./SearchBookTableItem";

export default function BookTable({
	bookArray,
	handleRerender,
}: {
	bookArray: Array<IScannedBookLayout>;
	handleRerender: Function;
}) {
	return (
		<TableContainer
			overflowY={"scroll"}
			maxHeight={"375px"}
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
			<Table variant="simple">
				<Thead
					borderWidth={2}
					borderColor={useColorModeValue("gray.300", "gray.600")}
					position={"sticky"}
					top={-0.5}
					zIndex={2}
				>
					<Tr>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>Barcode</Th>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>ISBN</Th>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>Title</Th>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>Author</Th>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>Year</Th>
						<Th bgColor={useColorModeValue("gray.300", "gray.800")}>
							Publisher
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
								Unfortunately couldn&apos;t find any books by that search...
							</Th>
						</Tr>
					</Tbody>
				)}
				{bookArray.length > 0 &&
					bookArray.map((book) => (
						<BookTableItem
							key={book.bookID}
							book={book}
							handleRerender={handleRerender}
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
		</TableContainer>
	);
}
