import {
	Box,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Divider,
	HStack,
} from "@chakra-ui/react";
import CustomEditableInput from "../Inputs/CustomEditableInput";

function ResultItem({
	item,
	cardBodyName,
}: {
	item: string;
	cardBodyName: string;
}) {
	if (item != "") {
		return (
			<HStack>
				<Text fontWeight={700}>{cardBodyName}:</Text>
				<CustomEditableInput fontSize="lg" fontWeight={700} item={item} />
			</HStack>
		);
	}
	return (
		<HStack>
			<Text fontWeight={700}>{cardBodyName}:</Text>
			<CustomEditableInput
				fontSize="md"
				fontWeight={700}
				item={"Edit This..."}
			/>
		</HStack>
	);
}

export default function EditableResultCard({
	id,
	title,
	barcode,
	isbn,
	author,
	bookDetails,
}: IScannedBookLayout) {
	return (
		<Box
			p={5}
			maxW={"500px"}
			// w={"full"}
			bg={useColorModeValue("gray.100", "gray.700")}
			boxShadow={"xl"}
			rounded={"lg"}
			pos={"relative"}
			zIndex={1}
		>
			<Stack align={"Left"}>
				{title && (
					<CustomEditableInput fontSize="2xl" fontWeight={600} item={title} />
				)}
				{!title && (
					<CustomEditableInput
						fontSize="2xl"
						fontWeight={600}
						item={"Enter a title..."}
					/>
				)}

				<Divider borderColor={useColorModeValue("black", "white")} />
				<Stack>
					<ResultItem cardBodyName={"Author"} item={author} />
					<ResultItem cardBodyName={"Book Details"} item={bookDetails} />
					<ResultItem cardBodyName={"ISBN"} item={isbn} />
					<ResultItem cardBodyName={"Barcode"} item={barcode} />
				</Stack>
			</Stack>
		</Box>
	);
}
