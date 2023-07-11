"use client";
import {
	Box,
	FormLabel,
	Input,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import CustomDivider from "@/components/Divider/customDivider";
import ResultCard from "@/components/AddAuto/ResultCard";
import axios from "axios";
import AddButton from "@/components/Buttons/AddButton";
import BookCount from "@/components/BookCount/BookCount";
import { SuccessToast, WarningToast } from "@/components/Toasts/Toasts";

export default function AddAuto() {
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

		// Checks API For Book
		try {
			const bookResults = await axios.get(
				`/api/BookAPI/APIBookSearch?barcode=${barcode}`
			);
			console.log(bookResults.data);

			if (!bookResults) {
				ResetValues(undefined);
				return setIsError(true);
			}

			try {
				await axios.post("/api/BookAPI/Book", bookResults.data);
				await axios.put("/api/SalesAPI/SalesStats", {
					updateField: "addBook",
				});
				return ResetValues(bookResults.data);
			} catch {
				ResetValues(undefined);
				return setIsError(true);
			}
		} catch {}

		// Checks Private API For Books
		try {
			const customBookResults = await axios.get(
				`/api/BookAPI/CustomAPIBookSearch?barcode=${barcode}`
			);
			console.log(customBookResults.data);

			if (!customBookResults) {
				ResetValues(undefined);
				return setIsError(true);
			}

			try {
				await axios.post("/api/BookAPI/Book", customBookResults.data);
				await axios.put("/api/SalesAPI/SalesStats", {
					updateField: "addBook",
				});
				return ResetValues(customBookResults.data);
			} catch {
				ResetValues(undefined);
				return setIsError(true);
			}
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
				<Text fontSize="2xl">Auto Find Books</Text>
				<CustomDivider />
				<BookCount bookCount={bookCount} />
				<CustomDivider />
				<form onSubmit={(e) => formSubmit(e)}>
					<FormLabel>
						Add book to database:
						<Input
							disabled={loading}
							ref={barcodeInputRef}
							autoFocus
							autoComplete="off"
							name="barcode"
							type="text"
							value={barcode}
							placeholder="Start Scanning books..."
							onChange={(e) => setBarcode(e.target.value)}
						/>
					</FormLabel>

					<AddButton loading={loading} />
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

			{isError && toastDisplay && <WarningToast />}
			{!isError && toastDisplay && bookDetails && <SuccessToast />}
		</Box>
	);
}
