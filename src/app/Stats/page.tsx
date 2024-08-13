"use client";
import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CustomDivider from "@/components/Divider/customDivider";
import axios from "axios";
import { SalesStats } from "@prisma/client";
import BookCount from "@/components/BookCount/BookCount";
import StatsAreaBar from "@/components/Stats/StatsAreaBar";

export default function Stats() {
	const [salesStatsData, setSalesStatsData] = useState<Array<SalesStats>>();

	async function getSalesData() {
		const responseSalesStatsData = await axios.post("/api/SalesAPI/SalesStats");

		setSalesStatsData(responseSalesStatsData.data);
	}

	useEffect(() => {
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
				<BookCount />
				<CustomDivider />
					<StatsAreaBar data={salesStatsData}/>
			</VStack>
		</Box>
	);
}
