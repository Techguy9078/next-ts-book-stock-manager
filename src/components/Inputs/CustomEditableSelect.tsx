import { genreList } from '@/config/genreList';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  Editable,
  Flex,
  HStack,
  IconButton,
  Select,
  Text,
  useEditable,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function CustomEditableSelect({
  fontSize,
  fontWeight,
  onSubmit,
  genre,
}: {
  fontSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fontWeight: 400 | 500| 600 | 700;
  onSubmit: (nextValue: string) => void;
  genre: string;
}) {
  const [morphGenre, setMorphGenre] = useState(genre);

  function EditableSelect() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
      getPreviewProps,
    } = useEditable();

    return (
      <>
        {isEditing ? (
          <>
            <Select
              borderColor="gray.400"
              color="gray.400"
              placeholder="Select The Genre..."
              onChange={(e) => {
                onSubmit(e.currentTarget.value),
                  setMorphGenre(e.currentTarget.value);
              }}
              value={morphGenre}
              onBlur={(e) => {
                onSubmit(e.currentTarget.value),
                  setMorphGenre(e.currentTarget.value);
              }}
            >
              {genreList.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </Select>
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
          </>
        ) : (
          <Flex>
            <Text {...getPreviewProps()} paddingEnd={4}>{morphGenre}</Text>
            <IconButton
              aria-label="edit"
              size="sm"
              icon={<EditIcon />}
              {...getEditButtonProps()}
            />
          </Flex>
        )}
      </>
    );
  }

  return (
    <Editable
      value={morphGenre}
      fontSize={fontSize}
      fontWeight={fontWeight}
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      onSubmit={() => onSubmit(morphGenre)}
    >
      <HStack>
        <EditableSelect />
      </HStack>
    </Editable>
  );
}