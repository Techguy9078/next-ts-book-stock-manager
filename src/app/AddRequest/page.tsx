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
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import axios from "axios";
import CustomDivider from "@/components/Divider/customDivider";
import { CustomerBookRequest } from "@prisma/client";
import CustomerDataParse from "@/components/_helpers/CustomerDataParse";
import GenericButton from "@/components/Buttons/GenericButton";

export default function AddRequests() {
	const toast = useToast();

	const [loading, setLoading] = useState(false);
	const [customerDetails, setcustomerDetails] = useState<CustomerBookRequest>();
	const [isError, setIsError] = useState(false);
	const [toastDisplay, setToastDisplay] = useState(false);

	const { register, handleSubmit } = useForm<CustomerBookRequest>();

	const onSubmit: SubmitHandler<CustomerBookRequest> = async (data) => {
		setIsError(false);
		setLoading(true);
		try {
			const parsedData = await CustomerDataParse(data);
			await axios.post("/api/CustomerBookRequestAPI", parsedData);
			// return ResetValues(parsedData);
		} catch {
			ResetValues(undefined);
			return setIsError(true);
		}
	};

	function ResetValues(customerDetails: CustomerBookRequest | undefined) {
		setLoading(false);
		setcustomerDetails(customerDetails ? customerDetails : undefined);
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
				<Text fontSize="2xl">Add Customer Request</Text>
				<CustomDivider />
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormLabel>
						Manually enter the Customer details to add them to the database:
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

					<GenericButton isLoading={loading} buttonType="Add" />
				</form>

				{/* {customerDetails && <ResultCard {...customerDetails} />} */}
			</VStack>

			{/* Use For Images */}
			{/* {customerDetails?.isbn && (
				<Image
					src={`https://covers.openlibrary.org/b/isbn/${customerDetails.isbn}-M.jpg?default=false`}
					alt=""
				/>
			)} */}

			{isError && toastDisplay && !toast.isActive("warning") && (
				<Box display={"none"}>
					{toast({
						id: "warning",
						status: "warning",
						duration: 3000,
						title: "Adding Customer Failed",
						description: "This is no good... Ah shit here we go again...",
					})}
				</Box>
			)}

			{!isError &&
				toastDisplay &&
				customerDetails &&
				!toast.isActive("success") && (
					<Box display={"none"}>
						{toast({
							id: "success",
							status: "success",
							duration: 3000,
							title: "Added Customer",
							description: "Customer added successfully!",
						})}
					</Box>
				)}
		</Box>
	);
}

const manualInputs: Array<any> = [
	{ inputname: "name", placeholder: "Enter Full Name..." },
	{ inputname: "phone", placeholder: "Enter Phone Number..." },
	{
		inputname: "title",
		placeholder: "Enter Book Full Title...",
	},
	{
		inputname: "author",
		placeholder: "Enter Author's Full Name...",
	},
	{ inputname: "isbn", placeholder: "Enter Book ISBN..." },
	{
		inputname: "comments",
		placeholder: "Enter Additional Comments...",
	},
];
