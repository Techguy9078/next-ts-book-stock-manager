import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
	ButtonGroup,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	HStack,
	IconButton,
	Input,
	useEditableControls,
} from "@chakra-ui/react";

export default function CustomEditableInput({
	item,
	fontSize,
	fontWeight,
}: {
	item: string;
	fontSize: "sm" | "md" | "lg" | "xl" | "2xl";
	fontWeight: 600 | 700;
}) {
	function EditableControls() {
		const {
			isEditing,
			getSubmitButtonProps,
			getCancelButtonProps,
			getEditButtonProps,
		} = useEditableControls();

		return isEditing ? (
			<ButtonGroup size="sm">
				<IconButton
					aria-label="yes"
					icon={<CheckIcon />}
					{...getSubmitButtonProps()}
				/>
				<IconButton
					aria-label="no"
					icon={<CloseIcon />}
					{...getCancelButtonProps()}
				/>
			</ButtonGroup>
		) : (
			<Flex>
				<IconButton
					aria-label="edit"
					size="sm"
					icon={<EditIcon />}
					{...getEditButtonProps()}
				/>
			</Flex>
		);
	}

	return (
		<Editable
			defaultValue={item}
			fontSize={fontSize}
			fontWeight={fontWeight}
			isPreviewFocusable={false}
		>
			<HStack>
				<EditablePreview />
				<Input as={EditableInput} />
				<EditableControls />
			</HStack>
		</Editable>
	);
}
