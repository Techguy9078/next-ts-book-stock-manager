import { Button, Tbody, Td, Tr, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import ParkedToggle from '../Shared/ParkedToggle';

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
    await axios.delete(`/api/BookAPI/Book?id=${id}`);
    handleRefetch();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
