"use client";
import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { Suspense, useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer, toast } = createStandaloneToast();

import CustomDivider from "@/components/Divider/customDivider";
import BookCount from "@/components/BookCount/BookCount";
import BookTable from "@/components/Tables/SearchBookTable";
import { BookCountContext } from "../BookCountContext";
import { BookPagesLoader } from "@/components/Loading/BookPagesLoading";
import { AnySoaRecord } from "dns";
import SearchForm from "@/components/Forms/SearchForm";

const barcodeValidator = z.object({
	search: z.string().min(1),
});

type barcodeForm = z.infer<typeof barcodeValidator>;

export default function Search() {
	const { currentBookCount, getBookCount } = useContext(BookCountContext);

	const [reload, setReload] = useState(false);
	const [books, setBooks] = useState<Array<IScannedBookLayout>>();

	const { mutate: barcodeSearch, isLoading } = useMutation({
		mutationFn: async ({ search }: barcodeForm) => {
			setBooks(undefined);
			const { data } = await axios.get(`/api/BookAPI/Book?search=${search}`);

			if (!data) {
				throw Error();
			}

			return data as Array<IScannedBookLayout>;
		},
		onSuccess: async (data) => {
			getBookCount(currentBookCount);
			setBooks(data);
		},
		onError: (err: AnySoaRecord) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 500) {
					setBooks(undefined);
					console.log("Could not Find Any Books...");
				}
			}

			setBooks(undefined);

			return toast({
				id: "error",
				position: "top-right",
				status: "error",
				duration: 3000,
				title: "Something Went Wrong Try Again...",
				description:
					"Try Searching for books again, if this keeps happening contact the TECH GUY",
			});
		},
	});

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

				<SearchForm isLoading={isLoading} barcodeSearch={barcodeSearch} />
			</VStack>

			<BookPagesLoader />

			{isLoading && <BookPagesLoader />}

			{books && <BookTable bookArray={books} handleRerender={handleRerender} />}

			<ToastContainer />
		</Box>
	);
}
