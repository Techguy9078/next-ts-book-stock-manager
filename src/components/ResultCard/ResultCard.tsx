import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Divider,
  HStack,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function ResultItem({
  item,
  cardBodyName,
}: {
  item: string | null;
  cardBodyName: string;
}) {
  if (item != '') {
    return (
      <HStack>
        <Text fontWeight={700}>{cardBodyName}:</Text>
        <Text fontWeight={600}>{item}</Text>
      </HStack>
    );
  }
  return;
}

export default function ResultCard({
  title,
  barcode,
  isbn,
  author,
  genre,
  createdAt
}: IScannedBookLayout) {
  const [currentBookCount, setCurrentBookCount] = useState<number>(0);

  const id = 0 // ignore me please you shall be fixed eventually

  const BooksScannedOn = async ({title, author}: IScannedBookLayout) => {

    try {
      const response = await axios.get(
        `/api/BookAPI/Book?currentFindingBookTitle=${title}&currentFindingBookAuthor=${author}`,
      );
      console.log(response.data);

      const bookCountResults = response.data;

      setCurrentBookCount(Number(bookCountResults) || 0);
    } catch (error) {
      toast.error('Error searching for bookCount', {
        description: `${error}`,
      });
    }
  };

  useEffect(() => {
    return () => {
      BooksScannedOn({id, isbn, genre, barcode, title, author});
    };
  }, [title]);

  return (
    <Box
      p={5}
      maxW={'500px'}
      // w={"full"}
      bg={useColorModeValue('gray.100', 'gray.600')}
      boxShadow={'xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
    >
      <Stack align={'Left'}>
        <Heading fontSize={'2xl'} fontWeight={600}>
          {title && title}
        </Heading>
        <Flex justifyContent={'space-between'}>
          <Text fontSize="lg" fontWeight={600}>
            Scanned On: {createdAt.split('T')[0].split('-').reverse().join('-')}
          </Text>

          <Text fontSize="lg" fontWeight={600}>
            Currently Scanned On: {currentBookCount}
          </Text>
        </Flex>
        <Divider borderColor={useColorModeValue('black', 'white')} />
        <Stack>
          <ResultItem cardBodyName={'Author'} item={author} />
          <ResultItem cardBodyName={'Genre'} item={genre} />
          <ResultItem cardBodyName={'ISBN'} item={isbn} />
          <ResultItem cardBodyName={'Barcode'} item={barcode} />
        </Stack>
      </Stack>
    </Box>
  );
}
