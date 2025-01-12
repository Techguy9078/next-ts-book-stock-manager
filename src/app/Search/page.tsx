'use client';
import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { useIsMobile } from '@/utils/isMobile';
import CustomDivider from '@/components/Divider/customDivider';
import BookCount from '@/components/BookCount/BookCount';
import BookTable from '@/components/Tables/SearchBookTable';
import SearchForm from '@/components/Forms/SearchForm';
import SearchReportGenerateButton from '@/components/Buttons/SearchReportGenerateButton';
import MobileBookTable from '@/components/Tables/MobileBookTable';

export default function Search() {
  const [refetchValue, setRefetchValue] = useState<boolean>(false);
  const [books, setBooks] = useState<IScannedBookLayout[]>();

  const isMobile = useIsMobile();
  const color = useColorModeValue('gray.200', 'gray.700');

  const setBooksArray = (booksArray: IScannedBookLayout[] | undefined) => {
    setBooks(booksArray);
  };

  const handleRefetch = () => {
    setRefetchValue(!refetchValue);
  };

  return (
    <>
      {isMobile ? (
        <Box p={4} bgColor={color} rounded={'md'} maxHeight={'100vh'}>
          <VStack spacing={2} align={'left'} pb={4}>
            <BookCount />
            <SearchForm setBooksArray={setBooksArray} />
          </VStack>
          {books?.length === 0 ? (
            <Text fontSize="2xl">☹️ No books found, that is upsetting!</Text>
          ) : books ? (
            <MobileBookTable bookArray={books} handleRefetch={handleRefetch} />
          ) : null}
        </Box>
      ) : (
        <Box p={4} bgColor={color} rounded={'md'} maxHeight={'90vh'}>
          <VStack spacing={4} align={'left'} pb={4}>
            <Text fontSize="2xl">Search for Books</Text>
            <CustomDivider />
            <BookCount />
            {books && <SearchReportGenerateButton searchData={books} />}
            <CustomDivider />
            <SearchForm setBooksArray={setBooksArray} />
          </VStack>
          {books?.length === 0 ? (
            <Text fontSize="2xl">☹️ No books found, that is upsetting!</Text>
          ) : books?.length ? (
            <BookTable bookArray={books} handleRefetch={handleRefetch} />
          ) : null}
        </Box>
      )}
    </>
  );
}
