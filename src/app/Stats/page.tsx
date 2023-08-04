"use client";
import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";

import CustomDivider from "@/components/Divider/customDivider";
import axios from "axios";
import { SalesStats } from "@prisma/client";
import StatItem from "@/components/StatItem/StatItem";
import BookCount from "@/components/BookCount/BookCount";

export default function Stats() {
	const [refreshBookCount, setRefreshBookCount] = useState<boolean>(false);
	const [salesStatsData, setSalesStatsData] = useState<Array<SalesStats>>();
	const [bookCount, setBookCount] = useState<string>("");

	async function getSalesData() {
		const responseSalesStatsData = await axios.get("/api/SalesAPI/SalesStats");
		setSalesStatsData(responseSalesStatsData.data);
	}

	async function getBookCount() {
		const responseBookCount = await axios.get("/api/BookAPI/BookCount");
		setBookCount(responseBookCount.data);
	}

	useEffect(() => {
		setRefreshBookCount(!refreshBookCount);
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
				<BookCount refreshBookCount={refreshBookCount} />
				<CustomDivider />
				<VStack overflowY={"scroll"} align={"flex-start"} h={"70vh"}>
					{salesStatsData?.length &&
						salesStatsData.map((data) => (
							<Suspense key={data.date}>
								<StatItem data={data} bookCount={bookCount} />
							</Suspense>
						))}
				</VStack>
			</VStack>
		</Box>
	);
}
