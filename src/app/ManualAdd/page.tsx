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
	useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import ResultCard from "@/components/ResultCard/ResultCard";
import axios from "axios";
import CustomDivider from "@/components/Divider/customDivider";
import AddButton from "@/components/Buttons/AddButton";
import BookCount from "@/components/BookCount/BookCount";
import { ManualBookDataParse } from "@/components/_helpers/DataParse";
import { BookCountContext } from "../BookCountContext";

export default function ManualAdd() {
	const { currentBookCount, getBookCount } = useContext(BookCountContext);
	const toast = useToast();

	const [loading, setLoading] = useState(false);
	const [bookDetails, setBookDetails] = useState<IScannedBookLayout>();
	const [isError, setIsError] = useState(false);
	const [toastDisplay, setToastDisplay] = useState(false);

	const { register, handleSubmit } = useForm<IScannedBookLayout>();

	const onSubmit: SubmitHandler<IScannedBookLayout> = async (data) => {
		setIsError(false);
		setLoading(true);
		try {
			const parsedData = await ManualBookDataParse(data);
			await axios.post("/api/BookAPI/Book", parsedData);
			await axios.put("/api/SalesAPI/SalesStats", {
				updateField: "addBook",
			});
			return ResetValues(parsedData);
		} catch {
			ResetValues(undefined);
			return setIsError(true);
		}
	};

	function ResetValues(bookDetails: IScannedBookLayout | undefined) {
		setLoading(false);
		setBookDetails(bookDetails ? bookDetails : undefined);
		getBookCount(currentBookCount);
		setToastDisplay(true);

		setTimeout(() => {
			setToastDisplay(false);
		}, 2000);
	}

	return (
		<Box
			p={4}
			bgColor={useColorModeValue("gray.200", "gray.700")}
			rounded={"md"}
		>
			<VStack spacing={4} align={"left"}>
				<Text fontSize="2xl">Manual Add Books</Text>
				<CustomDivider />
				<BookCount />
				<CustomDivider />
				<form onSubmit={handleSubmit(onSubmit)}>
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

					<AddButton loading={loading} type="submit" />
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

			{isError && toastDisplay && !toast.isActive("warning") && (
				<Box display={"none"}>
					{toast({
						id: "warning",
						status: "warning",
						duration: 3000,
						title: "Adding Book Failed",
						description: "This is no good... Ah shit here we go again...",
					})}
				</Box>
			)}

			{!isError &&
				toastDisplay &&
				bookDetails &&
				!toast.isActive("success") && (
					<Box display={"none"}>
						{toast({
							id: "success",
							status: "success",
							duration: 3000,
							title: "Added Book",
							description: "Book added successfully!",
						})}
					</Box>
				)}
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
	{ inputname: "year", placeholder: "Enter Publish Year..." },
	{
		inputname: "publisher",
		placeholder: "Enter Publisher's Name...",
	},
];

interface IManualInputs {
	inputname: "barcode" | "isbn" | "title" | "author" | "year" | "publisher";
	placeholder: string;
}
