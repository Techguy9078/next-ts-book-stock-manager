import { Button, useColorModeValue } from "@chakra-ui/react";

export default function AddButton(loading: any) {
	return (
		<Button
			isLoading={loading.loading}
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
	);
}
