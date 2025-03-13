'use client';
import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/utils/isMobile';
import { AuditLog } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function AuditLogPage() {
  const [auditLog, setAuditLog] = useState<AuditLog[]>();

  const isMobile = useIsMobile();
  const color = useColorModeValue('gray.200', 'gray.700');

  const { data, isError } = useQuery(['AuditLog'], async () => {
    try {
      const res = await axios.get(`/api/AuditLogAPI`);
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
    if (data) setAuditLog(data);
    if (isError) setAuditLog(undefined);
  }, [data, isError, setAuditLog]);

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

        {auditLog?.length === 0 ? (
          <Text fontSize="1xl">No Audits Found Here...</Text>
        ) : auditLog ? (
          auditLog.map((auditItem) => <Text>{auditItem.action}</Text>)
        ) : null}
      </Box>
    </>
  );
}
