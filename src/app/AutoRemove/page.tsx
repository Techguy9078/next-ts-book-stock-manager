"use client";
import {
	Box,
	Text,
	VStack,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { AnySoaRecord } from "dns";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import CustomDivider from "@/components/Divider/customDivider";
import ResultCard from "@/components/ResultCard/ResultCard";
import { BookCountContext } from "../BookCountContext";
import BookCount from "@/components/BookCount/BookCount";
import BarcodeForm from "@/components/Forms/BarcodeForm";

const barcodeValidator = z.object({
	barcode: z.string().min(1),
});

type barcodeForm = z.infer<typeof barcodeValidator>;

export default function AutoRemove() {
	const { currentBookCount, getBookCount } = useContext(BookCountContext);
	const toast = useToast();

	const [bookDetails, setBookDetails] = useState<IScannedBookLayout>();

	const { mutate: barcodeSearch, isLoading } = useMutation({
		mutationKey: ["barcodeSearch"],
		mutationFn: async ({ barcode }: barcodeForm) => {
			const { data } = await axios.delete(
				`/api/BookAPI/Book?barcode=${barcode}`
			);

			if (!data) {
				throw Error();
			}

			return data as IScannedBookLayout;
		},
		onSuccess: async (data) => {
			await axios.put("/api/SalesAPI/SalesStats", {
				updateField: "removeBook",
			});
			await axios.post("/api/SalesAPI/Sales", data);

			getBookCount(currentBookCount);
			setBookDetails(data);

			return toast({
				id: "success",
				position: "top-right",
				status: "success",
				duration: 3000,
				title: "Removed Book",
				description: "Book removed successfully!",
			});
		},
		onError: (err: AnySoaRecord) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 500) {
					setBookDetails(undefined);

					return toast({
						id: "warning",
						position: "top-right",
						status: "warning",
						duration: 3000,
						title: "Removing Book Failed",
						description:
							"Book details have not been found, please remove manually!",
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
				<Text fontSize="2xl">Auto Remove Books</Text>
				<CustomDivider />
				<BookCount />
				<CustomDivider />
				<BarcodeForm
					isLoading={isLoading}
					barcodeSearch={barcodeSearch}
					formType="Remove"
				/>

				{bookDetails && <ResultCard {...bookDetails} />}
			</VStack>
		</Box>
	);
}
