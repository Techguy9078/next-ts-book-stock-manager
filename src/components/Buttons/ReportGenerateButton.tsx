import { Button, useColorModeValue } from "@chakra-ui/react";
import createReport from "@/components/Report/ReportGenerator";
import { Sales } from "@prisma/client";

export default function ReportGenerateButton({
	reportData,
	selectedDates,
}: {
	reportData: Array<Sales>;
	selectedDates: Array<Date>;
}) {
	return (
		<Button
			className={"bg-green-400"}
			color={"white"}
			_hover={{
				bgColor: "green.600",
				color: useColorModeValue("gray.300", "gray.300"),
			}}
			w={"50vw"}
			size="lg"
			px={10}
			mt={2}
			onClick={() =>
				createReport({
					reportData: reportData,
					selectedDates: selectedDates,
				})
			}
		>
			Generate Report
		</Button>
	);
}
