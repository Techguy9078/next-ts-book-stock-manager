import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AddButton from "../Buttons/AddButton";
import { useRef } from "react";
import { z } from "zod";

const barcodeValidator = z.object({
	barcode: z.string().min(1),
});

type barcodeForm = z.infer<typeof barcodeValidator>;

export default function BarcodeForm({
	barcodeSearch,
	isLoading,
}: {
	isLoading: boolean;
	barcodeSearch: Function;
}) {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<barcodeForm>({
		resolver: zodResolver(barcodeValidator),
		defaultValues: { barcode: "" },
	});

	return (
		<form
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
		</form>
	);
}
