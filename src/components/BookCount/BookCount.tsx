"use client";
import { BookCountContext } from "@/app/BookCountContext";
import { HStack, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";

export default function BookCount() {
	const { currentBookCount, getBookCount } = useContext(BookCountContext);

	useEffect(() => {
		getBookCount(currentBookCount);
	}, []);

	return (
		<HStack>
			<Text fontSize="2xl">Current Book Count: </Text>
			<Text fontSize="2xl">{currentBookCount}</Text>
		</HStack>
	);
}
