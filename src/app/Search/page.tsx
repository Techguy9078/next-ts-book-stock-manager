"use client";
import {
	Box,
	FormLabel,
	Input,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";

import CustomDivider from "@/components/Divider/customDivider";
import axios from "axios";
import BookCount from "@/components/BookCount/BookCount";
import BookTable from "@/components/Tables/SearchBookTable";
import { BookCountContext } from "../BookCountContext";

export default function Search() {
	const { currentBookCount, getBookCount } = useContext(BookCountContext);
	const barcodeInputRef = useRef<HTMLInputElement>(null);

	const [reload, setReload] = useState(false);
	const [search, setSearch] = useState<string>("");
	const [books, setBooks] = useState<Array<IScannedBookLayout>>();

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		async function FindBook() {
			if (search == "") return setBooks(undefined);
			try {
				let bookResults = await axios.get(
					`/api/BookAPI/Book?search=${search}`,
					{
						signal: signal,
					}
				);
				return setBooks(bookResults.data);
			} catch {
				return;
			}
		}
		FindBook();

		return () => {
			controller.abort();
		};
	}, [search, reload]);

	function handleRerender() {
		setReload(true);
		getBookCount(currentBookCount);
		setTimeout(() => {
			setReload(false);
		}, 2000);
	}

	return (
		<Box
			p={4}
			bgColor={useColorModeValue("gray.200", "gray.700")}
			rounded={"md"}
		>
			<VStack spacing={4} align={"left"} pb={4}>
				<Text fontSize="2xl">Search for Books</Text>
				<CustomDivider />
				<BookCount />
				<CustomDivider />

				<FormLabel>
					Find Book in database:
					<Input
						ref={barcodeInputRef}
						borderColor={"gray.400"}
						autoFocus
						autoComplete="off"
						name={"searchbox"}
						type="text"
						value={search}
						placeholder="Enter Book to search for..."
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</FormLabel>
			</VStack>

			{books && <BookTable bookArray={books} handleRerender={handleRerender} />}
		</Box>
	);
}
