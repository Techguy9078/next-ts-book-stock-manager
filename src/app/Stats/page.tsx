'use client';
import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Suspense, useContext, useEffect, useState } from 'react';

import CustomDivider from '@/components/Divider/customDivider';
import axios from 'axios';
import { SalesStats } from '@prisma/client';
import StatItem from '@/components/StatItem/StatItem';
import BookCount from '@/components/BookCount/BookCount';
import { BookCountContext } from '../BookCountContext';

export default function Stats() {
  const [salesStatsData, setSalesStatsData] = useState<Array<SalesStats>>();
  const { currentBookCount } = useContext(BookCountContext);

  async function getSalesData() {
    const responseSalesStatsData = await axios.post('/api/SalesAPI/SalesStats');
    setSalesStatsData(responseSalesStatsData.data);
  }

  useEffect(() => {
    getSalesData();
  }, []);

  return (
    <Box
      p={4}
      bgColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'md'}
    >
      <VStack spacing={4} align={'left'} pb={4}>
        <Text fontSize="2xl">Stats</Text>
        <CustomDivider />
        <BookCount />
        <CustomDivider />
        <VStack overflowY={'scroll'} align={'flex-start'} h={'70vh'}>
          {salesStatsData?.length &&
            salesStatsData.map((data) => (
              <Suspense key={data.date}>
                <StatItem data={data} bookCount={currentBookCount} />
              </Suspense>
            ))}
        </VStack>
      </VStack>
    </Box>
  );
}
