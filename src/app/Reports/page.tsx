"use client";
import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";

import CustomDivider from "@/components/Divider/customDivider";
import DatePicker from "@/components/DatePicker/DatePicker";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sales } from "@prisma/client";
import ReportGenerateButton from "@/components/Buttons/ReportGenerateButton";

export default function Reports() {
	const [selectedDates, setSelectedDates] = useState<Array<Date>>([]);

	const [reportData, setReportData] = useState<Array<Sales>>();

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		async function FindSales() {
			if (!selectedDates) return;
			try {
				let salesResults = await axios.get(
					`/api/SalesAPI/Sales?startDate=${selectedDates[0].toLocaleDateString()}&endDate=${selectedDates[1].toLocaleDateString()}`,
					{
						signal: signal,
					}
				);
				return setReportData(salesResults.data);
			} catch {
				return;
			}
		}
		FindSales();

		return () => {
			controller.abort();
		};
	}, [selectedDates]);

	function setDateRange(date: []) {
		setSelectedDates(date);
	}

	return (
		<Box
			p={4}
			bgColor={useColorModeValue("gray.200", "gray.700")}
			rounded={"md"}
		>
			<VStack spacing={4} align={"left"} pb={4}>
				<Text fontSize="2xl">Reports</Text>
				<CustomDivider />
				<DatePicker setDateRange={setDateRange} selectedDates={selectedDates} />
				<CustomDivider />
				{!reportData && (
					<Text>
						Seems Like you haven&apos;t selected any dates yet :)... Select some
						to begin
					</Text>
				)}
				{reportData && !reportData?.length && selectedDates && (
					<Text>Unfortunately there is no data for these days...</Text>
				)}
				{reportData?.length && (
					<ReportGenerateButton
						reportData={reportData}
						selectedDates={selectedDates}
					/>
				)}
			</VStack>
		</Box>
	);
}
