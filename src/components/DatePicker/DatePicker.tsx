import { Box, HStack, Input, Text, useColorModeValue } from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";

export default function DatePicker({
	setDateRange,
	selectedDates,
}: {
	setDateRange: any;
	selectedDates: Array<Date>;
}) {
	return (
		<HStack w={"50vw"} spacing={1}>
			<Text fontWeight={"semibold"} flex={1}>
				Select Date Range:
			</Text>
			<Box flex={3}>
				<RangeDatepicker
					propsConfigs={{
						dateNavBtnProps: {
							color: useColorModeValue("gray.600", "white"),
							variant: "outline",
						},
						dayOfMonthBtnProps: {
							defaultBtnProps: {
								rounded: "4",
								borderColor: useColorModeValue("gray.400", "white"),
								borderWidth: 0.5,
								color: useColorModeValue("gray.700", "white"),
								_hover: {
									color: "white !important",
									background: "purple.400 !important",
								},
							},
							isInRangeBtnProps: {
								color: "gray.300",
								backgroundColor: useColorModeValue(
									"gray.500 !important",
									"gray.600 !important"
								),
								borderColor: useColorModeValue(
									"gray.200 !important",
									"gray.800 !important"
								),
								borderWidth: 0.5,
							},
							selectedBtnProps: {
								variant: "solid",
								backgroundColor: useColorModeValue(
									"gray.600 !important",
									"gray.800 !important"
								),
								color: "gray.200",
								borderColor: useColorModeValue(
									"gray.200 !important",
									"gray.600 !important"
								),
								borderWidth: 0.5,
							},
							todayBtnProps: {
								borderColor: "none",
							},
						},
						inputProps: {
							placeholder: "Select your dates to begin...",
							size: "md",
							borderColor: useColorModeValue("gray.600", "white"),
						},
						popoverCompProps: {
							popoverContentProps: {
								background: useColorModeValue("gray.100", "gray.700"),
								color: useColorModeValue("gray.600", "white"),
							},
						},
					}}
					selectedDates={selectedDates}
					onDateChange={setDateRange}
				/>
			</Box>
		</HStack>
	);
}
