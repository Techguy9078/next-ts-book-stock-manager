"use client";
import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";

import CustomDivider from "@/components/Divider/customDivider";
import axios from "axios";
import { SalesStats } from "@prisma/client";
import StatItem from "@/components/StatItem/StatItem";
import BookCount from "@/components/BookCount/BookCount";

export default function Stats() {
	const [salesData, setSalesData] = useState<Array<SalesStats>>();
	const [bookCount, setBookCount] = useState<number>();

	async function getBookCount() {
		const responseBookCount = await axios.get("/api/BookAPI/BookCount");
		setBookCount(responseBookCount.data);
	}

	async function getSalesData() {
		const responseSalesData = await axios.get("/api/SalesAPI/SalesStats");
		setSalesData(responseSalesData.data);
	}

	useEffect(() => {
		getBookCount();
		getSalesData();
	}, []);

	return (
		<Box
			p={4}
			bgColor={useColorModeValue("gray.200", "gray.700")}
			rounded={"md"}
		>
			<VStack spacing={4} align={"left"} pb={4}>
				<Text fontSize="2xl">Stats</Text>
				<CustomDivider />
				{bookCount && <BookCount bookCount={bookCount.toString()} />}
				<CustomDivider />
				<VStack overflowY={"scroll"} align={"flex-start"} h={"70vh"}>
					{salesData?.length &&
						salesData.map((data) => (
							<Suspense key={data.date}>
								<StatItem data={data} bookCount={bookCount} />
							</Suspense>
						))}
				</VStack>
			</VStack>
		</Box>
	);
}
