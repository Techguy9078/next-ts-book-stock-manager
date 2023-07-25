"use client";
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer, toast } = createStandaloneToast();

import CustomDivider from "@/components/Divider/customDivider";
import ResultCard from "@/components/ResultCard/ResultCard";
import AddButton from "@/components/Buttons/AddButton";
import BookCount from "@/components/BookCount/BookCount";

import { BookCountContext } from "../BookCountContext";
import { AnySoaRecord } from "dns";
import BarcodeForm from "@/components/Forms/BarcodeForm";

const barcodeValidator = z.object({
	barcode: z.string().min(1),
});

type barcodeForm = z.infer<typeof barcodeValidator>;

export default function AddAuto() {
	const { currentBookCount, getBookCount } = useContext(BookCountContext);

	// const barcodeInputRef = useRef<HTMLInputElement>(null);

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<barcodeForm>({
		resolver: zodResolver(barcodeValidator),
		defaultValues: { barcode: "" },
	});

	const { mutate: barcodeSearch, isLoading } = useMutation({
		mutationKey: ["barcodeSearch"],
		mutationFn: async ({ barcode }: barcodeForm) => {
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

			getBookCount(currentBookCount);
			setBookDetails(data);

			// setTimeout(() => {
			// 	barcodeInputRef.current?.focus();
			// }, 200);

			return toast({
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

					// setTimeout(() => {
					// 	barcodeInputRef.current?.focus();
					// }, 200);

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

			// setTimeout(() => {
			// 	barcodeInputRef.current?.focus();
			// }, 200);

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

	const [bookDetails, setBookDetails] = useState<IScannedBookLayout>();

	return (
		<Box
			p={4}
			bgColor={useColorModeValue("gray.200", "gray.700")}
			rounded={"md"}
		>
			<VStack spacing={4} align={"left"}>
				<Text fontSize="2xl">Auto Find Books</Text>
				<CustomDivider />
				<BookCount />
				<CustomDivider />
				<BarcodeForm isLoading={isLoading} barcodeSearch={barcodeSearch} />
				{/* <form
					onSubmit={handleSubmit((data) => {
						barcodeSearch(data);
					})}
				>
					<FormControl isInvalid={errors.barcode ? true : false}>
						<FormLabel htmlFor="barcode">Add book to database:</FormLabel>
						<Input
							autoFocus
							autoComplete="off"
							borderColor={"gray.400"}
							disabled={isLoading}
							id="barcode"
							placeholder="Start Scanning books..."
							{...register("barcode", {
								required: "You need to enter or scan a barcode...",
							})}
						/>
						<FormErrorMessage>
							{errors.barcode && errors.barcode?.message}
						</FormErrorMessage>
					</FormControl>

					<AddButton isLoading={isLoading} />
				</form> */}

				{bookDetails && <ResultCard {...bookDetails} />}
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
