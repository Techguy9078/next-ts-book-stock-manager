"use client";
import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";

export default function Admin() {
	return (
		<Box
			p={4}
			bgColor={useColorModeValue("gray.200", "gray.700")}
			rounded={"md"}
		>
			<VStack spacing={4} align={"left"} pb={4}>
				<Text fontSize="2xl">Admin Functions</Text>
			</VStack>
		</Box>
	);
}
