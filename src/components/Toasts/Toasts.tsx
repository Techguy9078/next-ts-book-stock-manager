import { Box, useToast } from "@chakra-ui/react";

export function WarningToast() {
	const toast = useToast();

	return (
		<Box display={"none"}>
			{!toast.isActive("warning") && (
				<Box display={"none"}>
					{toast({
						id: "warning",
						status: "warning",
						duration: 3000,
						title: "Adding Book Failed",
						description:
							"Book details have not been found, please enter manually!",
					})}
				</Box>
			)}
		</Box>
	);
}

export function SuccessToast() {
	const toast = useToast();

	return (
		<Box display={"none"}>
			{!toast.isActive("success") && (
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
