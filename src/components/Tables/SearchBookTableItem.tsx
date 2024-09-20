import { Button, Tbody, Td, Tr, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import ParkedToggle from '../Shared/ParkedToggle';
import { toast } from 'sonner';
import CustomEditableInput from '../Inputs/CustomEditableInput';

export default function BookTableItem({
  book,
  handleRefetch,
}: {
  book: IScannedBookLayout;
  handleRefetch: Function;
}) {
  const [loading, setLoading] = useState(false);

  const { id, barcode, isbn, title, author, genre, createdAt } = book;

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

  async function removeBook() {
    setLoading(true);
    await axios
      .delete(`/api/BookAPI/Book?id=${id}`)
      .catch((err) => {
        toast.error('Something went wrong', {
          description: `${
            err?.response?.data?.error ||
            (err as any).message ||
            'Unknown Error'
          }`,
        });
      })
      .finally(() => {
        handleRefetch();
        setLoading(false);
      });
  }

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-AU');
  return (
    <Tbody
      key={id}
      borderStyle={'solid'}
      borderWidth={2}
      borderColor={useColorModeValue('gray.300', 'gray.800')}
    >
      <Tr>
        <Td>{barcode}</Td>
        <Td>
          <CustomEditableInput
            fontSize="lg"
            fontWeight={400}
            item={isbn}
            onSubmit={(data) => updateBookValue(barcode, 'isbn', data)}
          />
        </Td>
        <Td>
          <CustomEditableInput
            fontSize="lg"
            fontWeight={400}
            item={title}
            onSubmit={(data) => updateBookValue(barcode, 'title', data)}
          />
        </Td>
        <Td>
          <CustomEditableInput
            fontSize="lg"
            fontWeight={400}
            item={author}
            onSubmit={(data) => updateBookValue(barcode, 'author', data)}
          />
        </Td>
        <Td>{genre}</Td>
        <Td>{formattedDate}</Td>
        <Td>
          <ParkedToggle book={book} fontSize={'md'} />
        </Td>
        <Td>
          <Button
            isLoading={loading}
            loadingText={'Removing Book...'}
            className={'bg-red-400'}
            color={'white'}
            _hover={{
              bgColor: 'red.600',
              color: useColorModeValue('gray.300', 'gray.300'),
            }}
            w={'100%'}
            size="lg"
            px={10}
            onClick={removeBook}
          >
            Remove
          </Button>
        </Td>
      </Tr>
    </Tbody>
  );
}
