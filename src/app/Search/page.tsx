"use client";
import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { Suspense, useContext, useState } from "react";

import { createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer, toast } = createStandaloneToast();

import CustomDivider from "@/components/Divider/customDivider";
import BookCount from "@/components/BookCount/BookCount";
import BookTable from "@/components/Tables/SearchBookTable";
import { BookCountContext } from "../BookCountContext";
import SearchForm from "@/components/Forms/SearchForm";
import { BookPagesLoader } from "@/components/Loading/BookPagesLoading";

export default function Search() {
	const { currentBookCount, getBookCount } = useContext(BookCountContext);

	const [reload, setReload] = useState(false);
	const [books, setBooks] = useState<Array<IScannedBookLayout>>();
	const [isLoading, setIsLoading] = useState(false);

	function setBooksArray(booksArray: Array<IScannedBookLayout> | undefined) {
		setBooks(booksArray);
	}

	function setLoader(loader: boolean) {
		setIsLoading(loader);
	}

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

				<SearchForm setLoader={setLoader} setBooksArray={setBooksArray} />
			</VStack>

			{isLoading && <BookPagesLoader />}

			{books && <BookTable bookArray={books} handleRerender={handleRerender} />}

			<ToastContainer />
		</Box>
	);
}
