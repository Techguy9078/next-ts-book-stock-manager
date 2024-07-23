import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
	ButtonGroup,
	Editable,
	EditablePreview,
	Flex,
	HStack,
	IconButton,
	Select,
	useEditableControls,
} from "@chakra-ui/react";
import { useState } from "react";

export default function CustomEditableSelect({
	item,
	fontSize,
	fontWeight,
	onSubmit,
	genre,
}: {
	item: string;
	fontSize: "sm" | "md" | "lg" | "xl" | "2xl";
	fontWeight: 600 | 700;
	onSubmit: (nextValue: string) => void;
	genre: string;
}) {
	const [edit, setEdit] = useState(false);
	const [morphGenre, setMorphGenre] = useState(genre);

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
			defaultValue={morphGenre}
			value={morphGenre}
			fontSize={fontSize}
			fontWeight={fontWeight}
			isPreviewFocusable={true}
			selectAllOnFocus={false}
			onSubmit={() => {
				onSubmit(morphGenre), setEdit(false);
			}}
			onEdit={() => setEdit(true)}
		>
			<HStack>
				<EditablePreview px={2} />
				{edit && (
					<Select
					
						key={123}
						borderColor={"gray.400"}
						color={"gray.400"}
						placeholder={"Select The Genre..."}
						onChange={(e) => setMorphGenre(e.currentTarget.value)}
						defaultValue={morphGenre}
					>
						{genreList.map((genre) => (
							<option value={genre}>{genre}</option>
						))}
					</Select>
				)}

				<EditableControls />
			</HStack>
		</Editable>
	);
}

const genreList: Array<string> = [
	"General",
	"Crime",
	"War / Spy Fiction",
	"Contempory Romance",
	"Historical Romance",
	"Classics",
	"Art",
	"Comics",
	"Childrens",
	"Childrens Vintage",
];
