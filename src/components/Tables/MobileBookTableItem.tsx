import { Button, Card, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import CustomDivider from '../Divider/customDivider';
import ParkedToggle from '../Shared/ParkedToggle';
import { toast } from 'sonner';
import { BookCountContext } from '@/app/BookCountContext';

export default function MobileBookTableItem({
  book,
  handleRefetch,
}: {
  book: IScannedBookLayout;
  handleRefetch: Function;
}) {
  const { currentBookCount, getBookCount } = useContext(BookCountContext);
  const [loading, setLoading] = useState(false);

  const { id, barcode, isbn, title, author, genre, createdAt } = book;

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
        getBookCount(currentBookCount);
      });
  }

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-AU');

  return (
    <Card p={2} my={1} textAlign={'left'}>
      <Flex flexDir={'column'}>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          Barcode: {barcode}
        </Text>
        <Text fontSize={'sm'}>ISBN: {isbn}</Text>
        <Text fontSize={'sm'}>{title}</Text>
        <Text fontSize={'sm'}>{author}</Text>
        <CustomDivider />
        <Text fontSize={'sm'}>Genre: {genre}</Text>
        <Text fontSize={'sm'}>Added: {formattedDate}</Text>
        <ParkedToggle book={book} fontSize={'sm'} />
      </Flex>
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
        size="sm"
        px={10}
        m={'0, auto'}
        mt={2}
        onClick={removeBook}
      >
        Remove
      </Button>
    </Card>
  );
}
