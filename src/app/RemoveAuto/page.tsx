"use client";
import {
	Box,
	Button,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	VStack,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import CustomDivider from "@/components/Divider/customDivider";
import ResultCard from "@/components/AddAuto/ResultCard";
import axios from "axios";
import BookCount from "@/components/BookCount/BookCount";

export default function RemoveAuto() {
	const toast = useToast();
	const barcodeInputRef = useRef<HTMLInputElement>(null);

	const [bookCount, setBookCount] = useState("");

	const [barcode, setBarcode] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [bookDetails, setBookDetails] = useState<IScannedBookLayout>();
	const [isError, setIsError] = useState(false);
	const [toastDisplay, setToastDisplay] = useState(false);

	useEffect(() => {
		if (!bookCount) {
			getBookCount();
		}
	}, [bookCount]);

	async function getBookCount() {
		const responseBookCount = await axios.get("/api/BookAPI/BookCount");
		setBookCount(responseBookCount.data);
	}

	function ResetValues(bookDetails: IScannedBookLayout | undefined) {
		setLoading(false);
		setBarcode("");
		setBookDetails(bookDetails ? bookDetails : undefined);
		setBookCount("");
		setToastDisplay(true);

		setTimeout(() => {
			setToastDisplay(false);
		}, 2000);
		setTimeout(() => {
			barcodeInputRef.current?.focus();
		}, 200);
	}

	async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!barcode) return;
		setIsError(false);
		setLoading(true);

		try {
			const removedBook = await axios.delete(
				`/api/BookAPI/Book?barcode=${barcode}`
			);
			await axios.put("/api/SalesAPI/SalesStats", {
				updateField: "removeBook",
			});
			await axios.post("/api/SalesAPI/Sales", removedBook.data);

			ResetValues(removedBook.data);
			return setIsError(false);
		} catch {
			ResetValues(undefined);
			return setIsError(true);
		}
	}

	return (
		<Box
			p={4}
			bgColor={useColorModeValue("gray.200", "gray.700")}
			rounded={"md"}
		>
			<VStack spacing={4} align={"left"}>
				<Text fontSize="2xl">Auto Remove Books</Text>
				<CustomDivider />
				<BookCount bookCount={bookCount} />
				<CustomDivider />
				<form onSubmit={(e) => formSubmit(e)}>
					<FormLabel>
						Remove book from database:
						<InputGroup size="lg">
							<Input
								disabled={loading}
								ref={barcodeInputRef}
								name={"barcode"}
								autoFocus
								autoComplete="off"
								type="text"
								value={barcode}
								placeholder="Start Scanning books..."
								onChange={(e) => setBarcode(e.target.value)}
							/>
							<InputRightElement width={loading ? "12rem" : "7rem"}>
								<Button
									className={"bg-red-400"}
									_hover={{ bgColor: "red.300", color: "gray.900" }}
									type="submit"
									size="lg"
									isLoading={loading}
									loadingText={"Removing Book..."}
								>
									Remove
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormLabel>
				</form>
				{bookDetails && <ResultCard {...bookDetails} />}
			</VStack>

			{isError && toastDisplay && !toast.isActive("warning") && (
				<Box display={"none"}>
					{toast({
						id: "warning",
						status: "warning",
						duration: 3000,
						title: "Failed Removing Book...",
						description: "Book details have not been found!",
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
							title: "Book Removed",
							description: "Book removed successfully!",
						})}
					</Box>
				)}
		</Box>
	);
}
