import { HStack, Text } from '@chakra-ui/react';
import CustomEditableSelect from '../Inputs/CustomEditableSelect';
import CustomEditableInput from '../Inputs/CustomEditableInput';
import axios from 'axios';

function updateBookValue(barcode: string, field: string, updateData: string) {
  updateValues();

  async function updateValues() {
    await axios.patch('/api/BookAPI/Book', {
      barcode: barcode,
      field: field,
      updateData: updateData,
    });
  }
}

export default function ResultItem({
  barcode,
  item,
  cardBodyName,
  field,
  genre,
}: {
  barcode: string;
  item: string;
  cardBodyName: string;
  field: 'title' | 'author' | 'genre' | 'isbn';
  genre: string;
}) {
  if (field == 'genre') {
    return (
      <HStack>
        <Text fontWeight={700}>{cardBodyName}:</Text>
        <CustomEditableSelect
          fontSize="lg"
          fontWeight={600}
          onSubmit={(data) => updateBookValue(barcode, field, data)}
          genre={genre}
        />
      </HStack>
    );
  }
  return (
    <HStack>
      <Text fontWeight={700}>{cardBodyName}:</Text>
      <CustomEditableInput
        fontSize="lg"
        fontWeight={600}
        item={item || `Edit ${field}...`}
        onSubmit={(data) => updateBookValue(barcode, field, data)}
      />
    </HStack>
  );
}
