import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ZodErrorMap, z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const customErrorMap: ZodErrorMap = (error, ctx) => {
	if (error.code == "too_small") {
		return { message: `You need to enter at least 2 characters...` };
	}

	return { message: ctx.defaultError };
};

const barcodeValidator = z.object({
	search: z
		.string({
			errorMap: customErrorMap,
		})
		.min(2),
});

type SearchForm = z.infer<typeof barcodeValidator>;

export default function SearchForm({
	setBooksArray,
	setLoader,
	refetchValue,
}: {
	setLoader: Function;
	setBooksArray: Function;
	refetchValue: boolean;
}) {
	const [debouncedSearchValue, setDebouncedSearchValue] = useState<
		string | undefined
	>();
	const [search, setSearch] = useState<string | undefined>();

	const {
		register,
		watch,
		formState: { errors },
	} = useForm<SearchForm>({
		defaultValues: { search: "" },
	});

	const { data, status, refetch, isRefetching } = useQuery({
		queryKey: ["search"],
		queryFn: ({ signal }) => {
			return axios.get(`/api/BookAPI/Book?search=${debouncedSearchValue}`, {
				signal,
			});
		},
		enabled: false,
	});

	useEffect(() => {
		refetch();
	}, [refetchValue]);

	useEffect(() => {
		const subscription = watch((value) => {
			setSearch(value.search);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (search != undefined && search != "" && search.length > 2) {
				setDebouncedSearchValue(search);
			}

			if (
				debouncedSearchValue != undefined &&
				debouncedSearchValue != "" &&
				debouncedSearchValue.length > 2
			) {
				refetch();
			}
		}, 400);
		return () => clearTimeout(timeoutId);
	}, [search, debouncedSearchValue, refetch]);

	useEffect(() => {
		if (search && search.length > 2 && status == "success") {
			setBooksArray(data?.data);
		}
	}, [data]);

	useEffect(() => {
		if (isRefetching) {
			if (search && search.length > 2) {
				setBooksArray(undefined);
				setLoader(true);
			}
		}

		if (!isRefetching) {
			if (search && search.length < 3) {
				setBooksArray(undefined);
			}
			setLoader(false);
		}
	}, [search, isRefetching]);

	return (
		<FormControl isInvalid={errors.search ? true : false}>
			<FormLabel htmlFor="search">Search for a book...</FormLabel>
			<Input
				autoFocus
				autoComplete="off"
				borderColor={"gray.400"}
				id="search"
				placeholder="Start Searching books..."
				{...register("search", {
					required: "You need to enter a search term...",
				})}
			/>
			<FormHelperText color={"gray.400"}>
				Only will search once 3 letters have been entered
			</FormHelperText>
			<FormErrorMessage>
				{errors.search && errors.search?.message}
			</FormErrorMessage>
		</FormControl>
	);
}
