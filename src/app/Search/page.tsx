'use client';
import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

import CustomDivider from '@/components/Divider/customDivider';
import BookCount from '@/components/BookCount/BookCount';
import BookTable from '@/components/Tables/SearchBookTable';
import SearchForm from '@/components/Forms/SearchForm';
import { BookPagesLoader } from '@/components/Loading/BookPagesLoading';
import SearchReportGenerateButton from '@/components/Buttons/SearchReportGenerateButton';
import { useIsMobile } from '@/utils/isMobile';
import MobileBookTable from '@/components/Tables/MobileBookTable';

export default function Search() {
  const [refetchValue, setRefetchValue] = useState<boolean>(false);
  const [books, setBooks] = useState<Array<IScannedBookLayout>>();
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useIsMobile();

  function setBooksArray(booksArray: Array<IScannedBookLayout> | undefined) {
    setBooks(booksArray);
  }

  function setLoader(loader: boolean) {
    setIsLoading(loader);
  }

  function handleRefetch() {
    setRefetchValue(!refetchValue);
  }

  return (
    <>
      {isMobile ? (
        <Box
          p={4}
          bgColor={useColorModeValue('gray.200', 'gray.700')}
          rounded={'md'}
          maxHeight={'100vh'}
        >
          <VStack spacing={2} align={'left'} pb={4}>
            <BookCount />
            <SearchForm
              setLoader={setLoader}
              setBooksArray={setBooksArray}
              refetchValue={refetchValue}
            />
          </VStack>
          {isLoading && <BookPagesLoader />}
          {books && (
            <MobileBookTable bookArray={books} handleRefetch={handleRefetch} />
          )}
        </Box>
      ) : (
        <Box
          p={4}
          bgColor={useColorModeValue('gray.200', 'gray.700')}
          rounded={'md'}
          maxHeight={'90vh'}
        >
          <VStack spacing={4} align={'left'} pb={4}>
            <Text fontSize="2xl">Search for Books</Text>
            <CustomDivider />
            <BookCount />
            {books && <SearchReportGenerateButton searchData={books} />}
            <CustomDivider />

            <SearchForm
              setLoader={setLoader}
              setBooksArray={setBooksArray}
              refetchValue={refetchValue}
            />
          </VStack>
          {isLoading && <BookPagesLoader />}
          {books && (
            <BookTable bookArray={books} handleRefetch={handleRefetch} />
          )}
        </Box>
      )}
    </>
  );
}
