"use client";
import { HStack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BookCount({
	refreshBookCount,
}: {
	refreshBookCount: boolean;
}) {
	const [currentBookCount, setCurrentBookCount] = useState<string>("");

	async function getBookCount() {
		const responseBookCount = await axios.post("/api/BookAPI/BookCount");
		setCurrentBookCount(responseBookCount.data);
	}

	useEffect(() => {
		getBookCount();
	}, [refreshBookCount]);

	return (
		<HStack>
			<Text fontSize="2xl">Current Book Count: </Text>
			<Text fontSize="2xl">{currentBookCount}</Text>
		</HStack>
	);
}
