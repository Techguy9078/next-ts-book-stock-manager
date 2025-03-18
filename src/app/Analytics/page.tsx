'use client';
import {
  Box,
  Button,
  HStack,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/utils/isMobile';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { InfoIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Analytics } from '@prisma/client';

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

  const addAnalyticsLogEntry = async () => {
    const analyticEntry: Analytics = await axios.post('/api/AnalyticsAPI', {
      action: 'SCAN',
      status: 'SUCCESS',
    });

    return setAnalytic(analyticEntry);
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
          <Text fontSize="2xl">{isMobile ? null : 'Audit Log'}</Text>
        </VStack>
        <VStack spacing={[2, 4]} align="left" pb={4}>
          <Text fontSize="2xl">{analytic ? analytic.action : 'no Data'}</Text>
          <Button onClick={addAnalyticsLogEntry}>Add Analytics Entry</Button>
        </VStack>

        {analyticsLog?.length === 0 ? (
          <Text fontSize="1xl">No Analytics Found Here...</Text>
        ) : analyticsLog ? (
          <VStack>
            <HStack>
              <HStack>
                <Text>Action</Text>
                <Text>Status</Text>
                <Text>Event Time</Text>
              </HStack>
            </HStack>
            <VStack>
              {analyticsLog.map((analyticsItem) => (
                <HStack>
                  {analyticsItem.status == 'SUCCESS' ? (
                    <InfoIcon />
                  ) : (
                    <WarningTwoIcon />
                  )}
                  <Text>{analyticsItem.action}</Text>
                  <Text>{analyticsItem.status}</Text>
                  <Text>{analyticsItem.eventAt.toLocaleString()}</Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        ) : null}
      </Box>
    </>
  );
}
