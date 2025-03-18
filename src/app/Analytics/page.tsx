'use client';
import { Box, Button, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/utils/isMobile';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Analytics } from '@prisma/client';
import AnalyticsTable from '@/components/Tables/AnalyticsTable';

export default function AnalyticsLogPage() {
  const [analyticsLog, setAnalyticsLog] = useState<Analytics[]>();
  const [analytic, setAnalytic] = useState<Analytics>();

  const isMobile = useIsMobile();
  const color = useColorModeValue('gray.200', 'gray.700');

  const { data, isError } = useQuery(['Analytic'], async () => {
    try {
      const res = await axios.get(`/api/AnalyticsAPI`);
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        throw error;
      }
    }
  });

  useEffect(() => {
    if (data) setAnalyticsLog(data);
    if (isError) setAnalyticsLog(undefined);
  }, [data, isError, setAnalyticsLog]);

  // const addAnalyticsLogEntry = async () => {
  //   const analyticEntry: Analytics = await axios.post('/api/AnalyticsAPI', {
  //     action: 'SCAN',
  //     status: 'SUCCESS',
  //   });

  //   return setAnalytic(analyticEntry);
  // };

  return (
    <>
      <Box
        p={4}
        bgColor={color}
        rounded="md"
        maxHeight={isMobile ? '100vh' : '90vh'}
      >
        <VStack spacing={[2, 4]} align="left" pb={4}>
          <Text fontSize="2xl">{isMobile ? null : 'Analytics Log'}</Text>
        </VStack>

        <AnalyticsTable analyticsData={analyticsLog} />
      </Box>
    </>
  );
}
