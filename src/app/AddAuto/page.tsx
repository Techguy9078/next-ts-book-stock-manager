"use client";
import {
	Box,
	Button,
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

import CustomDivider from "@/components/Divider/customDivider";
import ResultCard from "@/components/ResultCard/ResultCard";
import AddButton from "@/components/Buttons/AddButton";
import BookCount from "@/components/BookCount/BookCount";
import { SuccessToast, WarningToast } from "@/components/Toasts/Toasts";
import { BookCountContext } from "../BookCountContext";

const barcodeValidator = z.object({
	barcode: z.string(),
});

type barcodeForm = z.infer<typeof barcodeValidator>;

export default function AddAuto() {
	const { currentBookCount, getBookCount } = useContext(BookCountContext);

	const barcodeInputRef = useRef<HTMLInputElement>(null);

	const { register, handleSubmit, getValues } = useForm<barcodeForm>({
		resolver: zodResolver(barcodeValidator),
	});

	const {
		mutate: barcodeSearch,
		isLoading,
		isError,
		isSuccess,
	} = useMutation({
		mutationFn: async ({ barcode }: barcodeForm) => {
			console.log(getValues().barcode);
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
			setTimeout(() => {
				barcodeInputRef.current?.focus();
			}, 200);
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 500) {
					return; // Error Toast of book not found
				}
			}
			// Otherwise Something Went Wrong Toast
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
				<form onSubmit={handleSubmit((data) => console.log(data))}>
					<FormLabel>
						Add book to database:
						<Input
							{...register("barcode")}
							borderColor={"gray.400"}
							disabled={isLoading}
							ref={barcodeInputRef}
							autoFocus
							type="text"
							autoComplete="off"
							name="barcode"
							placeholder="Start Scanning books..."
						/>
					</FormLabel>

					<Button
						isLoading={isLoading}
						loadingText={"Adding Book..."}
						className={"bg-green-400"}
						color={"white"}
						_hover={{
							bgColor: "green.600",
							color: useColorModeValue("gray.300", "gray.300"),
						}}
						w={"100%"}
						size="lg"
						px={10}
						mt={2}
						type="submit"
					>
						Add
					</Button>
				</form>

				{bookDetails && <ResultCard {...bookDetails} />}
			</VStack>

			{/* Use For Images */}
			{/* {bookDetails?.isbn && (
				<Image
					src={`https://covers.openlibrary.org/b/isbn/${bookDetails.isbn}-M.jpg?default=false`}
					alt=""
				/>
			)} */}
		</Box>
	);
}
