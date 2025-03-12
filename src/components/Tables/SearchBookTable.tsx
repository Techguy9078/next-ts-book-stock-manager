import {
  Box,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import BookTableItem from './SearchBookTableItem';

export default function BookTable({
  bookArray,
  handleRefetch,
}: {
  bookArray: Array<IScannedBookLayout>;
  handleRefetch: Function;
}) {
  return (
    <Box
      maxHeight="50vh"
      overflowY="auto"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      borderRadius="md"
    >
      <Table
        variant="striped"
        size="md"
        fontSize={{ sm: 'sm', md: 'md' }}
        sx={{
          '::-webkit-scrollbar': {
            width: '4px',
          },
          '::-webkit-scrollbar-track': {
            bgColor: useColorModeValue('gray.300', 'gray.600'),
            borderRadius: '100px',
          },
          '::-webkit-scrollbar-thumb': {
            bgColor: useColorModeValue('gray.400', 'gray.800'),
            borderRadius: '100px',
          },
        }}
      >
        <Thead
          borderColor={useColorModeValue('gray.300', 'gray.600')}
          zIndex={2}
        >
          <Tr>
            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>ISBN</Th>
            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>Title</Th>
            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>Author</Th>
            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>Genre</Th>
            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>
              Scanned Date
            </Th>
            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>Status</Th>
            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>Delete</Th>
          </Tr>
        </Thead>
        <Tbody
          borderStyle="solid"
          borderWidth={1}
          borderColor={useColorModeValue('gray.100', 'gray.800')}
        >
          {!bookArray?.length && (
            <Tr>
              <Th colSpan={7} textAlign="center">
                Unfortunately couldn&apos;t find any books by that search, maybe
                try typing more or a different search...
              </Th>
            </Tr>
          )}
          {bookArray.length > 0 &&
            bookArray.map((book) => (
              <BookTableItem
                key={book.id}
                book={book}
                handleRefetch={handleRefetch}
              />
            ))}
        </Tbody>
      </Table>
    </Box>
  );
}
