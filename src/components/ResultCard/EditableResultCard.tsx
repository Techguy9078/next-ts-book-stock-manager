import {
  Box,
  useColorModeValue,
  Text,
  Stack,
  Divider,
  HStack,
} from '@chakra-ui/react';
import CustomEditableInput from '../Inputs/CustomEditableInput';
import axios from 'axios';
import CustomEditableSelect from '../Inputs/CustomEditableSelect';
import ParkedToggle from '../Shared/ParkedToggle';
import DeleteBookConfirmation from '../Shared/DeleteBookConfirmation';

function updateBookValue(barcode: string, field: string, updateData: string) {
  async function updateValues() {
    await axios.patch('/api/BookAPI/Book', {
      barcode: barcode,
      field: field,
      updateData: updateData,
    });
  }

  updateValues();
}

export default function EditableResultCard({
  title,
  barcode,
  isbn,
  author,
  genre,
  createdAt,
  isStocktake,
  maxWidth,
  setBookDeleted,
  ...rest
}: IScannedBookLayout & {
  isStocktake?: boolean;
  maxWidth?: string;
  setBookDeleted?: (book: IScannedBookLayout) => void;
}) {
  const book = {
    title,
    barcode,
    isbn,
    author,
    genre,
    createdAt,
    setBookDeleted,
    ...rest,
  };
  return (
    <Box
      p={5}
      maxW={maxWidth || '500px'}
      bg={useColorModeValue('gray.100', 'gray.600')}
      boxShadow={'xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
    >
      <Stack align={'Left'}>
        <CustomEditableInput
          fontSize="2xl"
          fontWeight={600}
          item={title || 'Enter a title...'}
          onSubmit={(data) => updateBookValue(barcode, 'title', data)}
        />
        <ResultItem
          barcode={barcode}
          cardBodyName={'Created'}
          field={'createdAt'}
          item={createdAt.split('T')[0].split('-').reverse().join('-')}
          genre={''}
        />
        <Divider borderColor={useColorModeValue('black', 'white')} />
        <Stack>
          <ResultItem
            barcode={barcode}
            cardBodyName={'Author'}
            field={'author'}
            item={author}
            genre={''}
          />
          <ResultItem
            barcode={barcode}
            cardBodyName={'Genre'}
            field={'genre'}
            genre={genre}
            item={genre}
          />
          <ResultItem
            barcode={barcode}
            cardBodyName={'ISBN'}
            field={'isbn'}
            item={isbn}
            genre={''}
          />
          <HStack>
            <Text fontWeight={700}>Barcode:</Text>
            <Text fontSize={'lg'} fontWeight={600}>
              {barcode}
            </Text>
          </HStack>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            align="center"
            justifyContent="space-between"
          >
            <ParkedToggle book={book} fontSize="lg" fontWeight={600} />
            {isStocktake ? (
              <DeleteBookConfirmation
                book={book}
                onDelete={setBookDeleted}
                deleteById
              />
            ) : null}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

function ResultItem({
  barcode,
  item,
  cardBodyName,
  field,
  genre,
}: {
  barcode: string;
  item: string;
  cardBodyName: string;
  field: 'title' | 'author' | 'genre' | 'isbn' | 'createdAt';
  genre: string;
}) {
  if (field == 'genre') {
    return (
      <HStack>
        <Text fontWeight={700}>{cardBodyName}:</Text>
        <CustomEditableSelect
          fontSize="lg"
          fontWeight={600}
          item={item || `Edit ${field}...`}
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
        onSubmit={(data) =>
          field !== 'createdAt' && updateBookValue(barcode, field, data)
        }
        isDisabled={field === 'createdAt'}
      />
    </HStack>
  );
}
