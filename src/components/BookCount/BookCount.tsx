"use client";
import { BookCountContext } from "@/app/BookCountContext";
import { HStack, Text } from "@chakra-ui/react";
import { useContext } from "react";

export default function BookCount() {
	const { currentBookCount } = useContext(BookCountContext);

	return (
		<HStack>
			<Text fontSize="2xl">Current Book Count: </Text>
			<Text fontSize="2xl">{currentBookCount}</Text>
		</HStack>
	);
}
