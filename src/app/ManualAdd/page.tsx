"use client";
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer, toast } = createStandaloneToast();

import ResultCard from "@/components/ResultCard/ResultCard";
import axios, { AxiosError } from "axios";
import CustomDivider from "@/components/Divider/customDivider";
import AddButton from "@/components/Buttons/AddButton";
import BookCount from "@/components/BookCount/BookCount";
import { ManualBookDataParse } from "@/components/_helpers/DataParse";
import { AnySoaRecord } from "dns";
import { useMutation } from "@tanstack/react-query";

export default function ManualAdd() {
	const [bookDetails, setBookDetails] = useState<IScannedBookLayout>();
	const [refreshBookCount, setRefreshBookCount] = useState<Boolean>(false);

	const { register, reset, handleSubmit } = useForm<IScannedBookLayout>();

	const { mutate: formSubmit, isLoading } = useMutation({
		mutationFn: async (formData: IScannedBookLayout) => {
			const parsedData = await ManualBookDataParse(formData);
			const { data } = await axios.post("/api/BookAPI/Book", parsedData);

			if (!data) {
				throw Error();
			}

			return data as IScannedBookLayout;
		},
		onSuccess: async (data) => {
			setRefreshBookCount(!refreshBookCount);
			setBookDetails(data);
			reset();

			await axios.put("/api/SalesAPI/SalesStats", {
				updateField: "addBook",
			});

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
					console.log(
						"Could not Add Book Details...",
						err.response?.statusText
					);

					return toast({
						id: "warning",
						position: "top-right",
						status: "warning",
						duration: 3000,
						title: "Adding Book Failed",
						description: "Error Adding Book Manually!",
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
				<Text fontSize="2xl">Manual Add Books</Text>
				<CustomDivider />
				<BookCount refreshBookCount={refreshBookCount} />
				<CustomDivider />
				<form onSubmit={handleSubmit((data) => formSubmit(data))}>
					<FormLabel>
						Manually enter the book details to add them to the database:
						<VStack>
							{manualInputs.map(({ placeholder, inputname }, i) => (
								<FormControl key={i}>
									<InputGroup>
										<InputLeftAddon inlineSize={110}>
											{inputname.charAt(0).toUpperCase() +
												inputname.slice(1) +
												":"}
										</InputLeftAddon>
										<Input
											borderColor={"gray.400"}
											id={inputname}
											autoComplete="off"
											placeholder={placeholder}
											{...register(inputname, { required: true })}
										/>
									</InputGroup>
								</FormControl>
							))}
						</VStack>
					</FormLabel>

					<AddButton isLoading={isLoading} />
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
			<ToastContainer />
		</Box>
	);
}

const manualInputs: Array<IManualInputs> = [
	{ inputname: "barcode", placeholder: "Enter Barcode..." },
	{ inputname: "isbn", placeholder: "Enter ISBN..." },
	{
		inputname: "title",
		placeholder: "Enter Books Full Title...",
	},
	{
		inputname: "author",
		placeholder: "Enter Author's Full Name...",
	},
	{ inputname: "bookDetails", placeholder: "Enter Any Book Details..." },
];

interface IManualInputs {
	inputname: "barcode" | "isbn" | "title" | "author" | "bookDetails";
	placeholder: string;
}
