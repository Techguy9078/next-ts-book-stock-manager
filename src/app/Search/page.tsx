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
  const [refetch, setRefetch] = useState<boolean>(false);
  const [books, setBooks] = useState<IScannedBookLayout[]>();

  const isMobile = useIsMobile();
  const color = useColorModeValue('gray.200', 'gray.700');

  const setBooksArray = (booksArray: IScannedBookLayout[] | undefined) => {
    setBooks(booksArray);
  };

  const handleRefetch = () => {
    setRefetch(true);
    requestAnimationFrame(() => {
      setRefetch(false);
    });
  };

  return (
    <>
      <Box
        p={4}
        bgColor={color}
        rounded="md"
        maxHeight={isMobile ? '100vh' : '90vh'}
      >
        <VStack spacing={[2, 4]} align="left" pb={4}>
          <Text fontSize="2xl">{isMobile ? null : 'Search for Books'}</Text>
          {!isMobile && <CustomDivider />}
          <BookCount />
          {!isMobile && books && (
            <SearchReportGenerateButton searchData={books} />
          )}
          {!isMobile && <CustomDivider />}
          <SearchForm setBooksArray={setBooksArray} refetch={refetch} />
        </VStack>

        {books?.length === 0 ? (
          <Text fontSize="1xl">
            No results to display, try searching for something else...
          </Text>
        ) : books ? (
          isMobile ? (
            <MobileBookTable bookArray={books} handleRefetch={handleRefetch} />
          ) : (
            <BookTable bookArray={books} handleRefetch={handleRefetch} />
          )
        ) : null}
      </Box>
    </>
  );
}
