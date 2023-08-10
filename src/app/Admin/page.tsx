"use client";
import { Box, Button, Text, VStack, useColorModeValue } from "@chakra-ui/react";

export default function Admin() {
	return (
		<Box
			p={4}
			bgColor={useColorModeValue("gray.200", "gray.700")}
			rounded={"md"}
		>
			<VStack spacing={4} align={"left"} pb={4}>
				<Text fontSize="2xl">Admin Functions</Text>
				<Button
					bgColor={"green.200"}
					onClick={() => {
						import("@/utils/pgDump").then((module: any) => module.default());
					}}
				>
					Export Database
				</Button>
			</VStack>
		</Box>
	);
}
