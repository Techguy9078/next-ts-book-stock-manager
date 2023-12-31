"use client";
import {
	Box,
	Flex,
	Spacer,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

import CustomDivider from "@/components/Divider/customDivider";
import BookCount from "@/components/BookCount/BookCount";
import BookTable from "@/components/Tables/SearchBookTable";
import SearchForm from "@/components/Forms/SearchForm";
import { BookPagesLoader } from "@/components/Loading/BookPagesLoading";
import SearchReportGenerateButton from "@/components/Buttons/SearchReportGenerateButton";

export default function Search() {
	const [refetchValue, setRefetchValue] = useState<boolean>(false);
	const [books, setBooks] = useState<Array<IScannedBookLayout>>();
	const [isLoading, setIsLoading] = useState(false);

	function setBooksArray(booksArray: Array<IScannedBookLayout> | undefined) {
		setBooks(booksArray);
	}

	function setLoader(loader: boolean) {
		setIsLoading(loader);
	}

	function handleRefetch() {
		setRefetchValue(!refetchValue);
	}

	return (
		<Box
			p={4}
			bgColor={useColorModeValue("gray.200", "gray.700")}
			rounded={"md"}
			maxHeight={"90vh"}
		>
			<VStack spacing={4} align={"left"} pb={4}>
				<Text fontSize="2xl">Search for Books</Text>
				<CustomDivider />
				<Flex>
					<BookCount />
					<Spacer />
					{books && <SearchReportGenerateButton searchData={books} />}
				</Flex>
				<CustomDivider />

				<SearchForm
					setLoader={setLoader}
					setBooksArray={setBooksArray}
					refetchValue={refetchValue}
				/>
			</VStack>
			{isLoading && <BookPagesLoader />}
			{books && <BookTable bookArray={books} handleRefetch={handleRefetch} />}
		</Box>
	);
}
