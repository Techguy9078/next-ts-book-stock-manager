import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodErrorMap, z } from "zod";
import { useEffect } from "react";

const customErrorMap: ZodErrorMap = (error, ctx) => {
	if (error.code == "too_small") {
		return { message: `No barcode entered please scan a book...` };
	}

	return { message: ctx.defaultError };
};

const barcodeValidator = z.object({
	search: z
		.string({
			errorMap: customErrorMap,
		})
		.min(3),
});

type SearchForm = z.infer<typeof barcodeValidator>;

export default function SearchForm({
	barcodeSearch,
	isLoading,
}: {
	barcodeSearch: Function;
	isLoading: boolean;
}) {
	const {
		register,
		handleSubmit,
		setFocus,
		formState: { errors },
	} = useForm<SearchForm>({
		resolver: zodResolver(barcodeValidator),
		defaultValues: { search: "" },
	});

	useEffect(() => {
		if (!isLoading) {
			setFocus("search");
		}
	}, [setFocus, isLoading]);

	return (
		<form
			onSubmit={handleSubmit((data) => {
				barcodeSearch(data);
			})}
		>
			<FormControl isInvalid={errors.search ? true : false}>
				<FormLabel htmlFor="search">Search for a book...</FormLabel>
				<Input
					autoFocus
					autoComplete="off"
					borderColor={"gray.400"}
					disabled={isLoading}
					id="search"
					placeholder="Start Scanning books..."
					{...register("search", {
						required: "You need to enter a search term...",
					})}
				/>
				<FormErrorMessage>
					{errors.search && errors.search?.message}
				</FormErrorMessage>
			</FormControl>
		</form>
	);
}
