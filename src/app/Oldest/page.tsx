'use client';
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import BookTable from '@/components/Tables/BookTable';
import CustomDivider from '@/components/Divider/customDivider';
import BookCount from '@/components/BookCount/BookCount';
import { BookPagesLoader } from '@/components/Loading/BookPagesLoading';
import SearchReportGenerateButton from '@/components/Buttons/SearchReportGenerateButton';

export default function Oldest() {
  const { data, refetch, isRefetching } = useQuery({
    queryKey: ['oldest'],
    queryFn: ({ signal }) => {
      return axios.get(`/api/BookAPI/Book?oldest=100`, {
        signal,
      });
    },
  });

  function handleRefetch() {
    refetch();
  }

  return (
    <Box
      p={4}
      bgColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'md'}
      maxHeight={'90vh'}
    >
      <VStack spacing={4} align={'left'} pb={4}>
        <Text fontSize="2xl">These are the Oldest Books</Text>
        <CustomDivider />
        <Flex>
          <BookCount />
          <Spacer />
          {data && <SearchReportGenerateButton searchData={data.data} />}
        </Flex>
        <CustomDivider />
      </VStack>
      {isRefetching && <BookPagesLoader />}
      {data && (
        <BookTable bookArray={data.data} handleRefetch={handleRefetch} />
      )}
    </Box>
  );
}
