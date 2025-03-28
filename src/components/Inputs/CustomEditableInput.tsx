import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react';

export default function CustomEditableInput({
  item,
  fontSize,
  fontWeight,
  onSubmit,
  isDisabled,
}: {
  item: string;
  fontSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fontWeight: 600 | 700;
  onSubmit: (nextValue: string) => void;
  isDisabled?: boolean;
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
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      onSubmit={onSubmit}
    >
      <HStack>
        <EditablePreview px={2} />
        <EditableInput px={2} />
        {!isDisabled ? <EditableControls /> : null}
      </HStack>
    </Editable>
  );
}
