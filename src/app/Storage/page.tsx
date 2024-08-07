"use client";
import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { AnySoaRecord } from "dns";


import { createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer, toast } = createStandaloneToast();

import CustomDivider from "@/components/Divider/customDivider";
import BookCount from "@/components/BookCount/BookCount";

import BarcodeForm from "@/components/Forms/BarcodeForm";
import EditableResultCard from "@/components/ResultCard/EditableResultCard";
import { BookCountContext } from "../BookCountContext";

const barcodeValidator = z.object({
	barcode: z.string().min(1),
});

type barcodeForm = z.infer<typeof barcodeValidator>;

export default function AutoAdd() {
	const [bookDetails, setBookDetails] = useState<IScannedBookLayout>();
	const { getBookCount } = useContext(BookCountContext);

	const { mutate: barcodeSearch, isLoading } = useMutation({
		mutationFn: async ({ barcode }: barcodeForm) => {
			setBookDetails(undefined);
			try {
				const { data } = await axios.get(
					`/api/BookAPI/APIBookSearch?barcode=${barcode}`
				);

				if (!data) {
					throw Error();
				}

				return data as IScannedBookLayout;
			} catch {
				const { data } = await axios.get(
					`/api/BookAPI/CustomAPIBookSearch?barcode=${barcode}`
				);

				if (!data) {
					throw Error();
				}

				return data as IScannedBookLayout;
			}
		},
		onSuccess: async (data) => {
			await axios.post("/api/BookAPI/Book", data);

			await axios.put("/api/SalesAPI/SalesStats", {
				updateField: "addBook",
			});

			getBookCount(null);
			setBookDetails(data);

			toast({
				id: "success",
				position: "top-right",
				status: "success",
				duration: 3000,
				title: "Added Book",
				description: "Book added successfully!",
			});
		},
		onError: (err: AnySoaRecord) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 500) {
					setBookDetails(undefined);
					console.log("Could not Find Book Details...");

					return toast({
						id: "warning",
						position: "top-right",
						status: "warning",
						duration: 3000,
						title: "Adding Book Failed",
						description:
						"Book details have not been found, please enter manually!",
					});
				}
			}

			setBookDetails(undefined);

			return toast({
				id: "error",
				position: "top-right",
				status: "error",
				duration: 3000,
				title: "Something Went Wrong Try Again",
				description:
					"Try Scanning the book again, if this keeps happening contact the TECH GUY",
			});
		},
	});

	return (
		<Box
			p={4}
			bgColor={useColorModeValue("gray.200", "gray.700")}
			rounded={"md"}
		>
			<VStack spacing={4} align={"left"}>
				<Text fontSize="2xl">Auto Add Books</Text>
				<CustomDivider />
				<BookCount />
				<CustomDivider />
				<BarcodeForm
					isLoading={isLoading}
					barcodeSearch={barcodeSearch}
					formType="Add"
				/>

				{bookDetails && <EditableResultCard {...bookDetails} />}
			</VStack>

			{/* Use For Images */}
			{/* {bookDetails?.isbn && (
				<Image
					src={`https://covers.openlibrary.org/b/isbn/${bookDetails.isbn}-M.jpg?default=false`}
					alt=""
				/>
			)} */}
			<ToastContainer />
		</Box>
	);
}
