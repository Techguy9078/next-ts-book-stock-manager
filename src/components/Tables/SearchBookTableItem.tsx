import { Button, Td, Tr, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import ParkedToggle from '../Shared/ParkedToggle';
import { toast } from 'sonner';

export default function BookTableItem({
  book,
  handleRefetch,
}: {
  book: IScannedBookLayout;
  handleRefetch: Function;
}) {
  const [loading, setLoading] = useState(false);

  const { id, isbn, title, author, genre, createdAt } = book;

  async function removeBook() {
    setLoading(true);
    await axios
      .delete(`/api/BookAPI/Book?id=${id.toString()}`)
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
    <Tr borderBottom={'1px solid white'}>
      <Td>{isbn}</Td>
      <Td>{title}</Td>
      <Td>{author}</Td>
      <Td>{genre}</Td>
      <Td>{formattedDate}</Td>
      <Td>
        <ParkedToggle book={book} fontSize={'md'} />
      </Td>
      <Td>
        <Button
          isLoading={loading}
          loadingText={''}
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
  );
}
