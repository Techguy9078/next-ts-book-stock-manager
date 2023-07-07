import { Divider, useColorModeValue } from "@chakra-ui/react";

export default function CustomDivider() {
	return (
		<Divider
			w={"60vw"}
			borderColor={useColorModeValue("black", "white")}
		/>
	);
}
