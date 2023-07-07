"use client";
import { HStack, Text } from "@chakra-ui/react";

export default function BookCount({ bookCount }: { bookCount: string }) {
	return (
		<HStack>
			<Text fontSize="2xl">Current Book Count: </Text>
			<Text fontSize="2xl">{bookCount}</Text>
		</HStack>
	);
}
