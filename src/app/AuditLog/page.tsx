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
import { AuditLog } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { InfoIcon, WarningTwoIcon } from '@chakra-ui/icons';

export default function AuditLogPage() {
  const [auditLog, setAuditLog] = useState<AuditLog[]>();
  const [audit, setAudit] = useState<AuditLog>();

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

  const addAuditLogEntry = async () => {
    const auditEntry: AuditLog = await axios.post('/api/AuditLogAPI', {
      action: 'SCAN',
      status: 'SUCCESS',
    });

    return setAudit(auditEntry);
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
          <Text fontSize="2xl">{audit ? audit.action : 'no Data'}</Text>
          <Button onClick={addAuditLogEntry}>Add AuditEntry</Button>
        </VStack>

        {auditLog?.length === 0 ? (
          <Text fontSize="1xl">No Audits Found Here...</Text>
        ) : auditLog ? (
          <VStack>
            <HStack>
              <HStack>
                <Text>Action</Text>
                <Text>Status</Text>
                <Text>Event Time</Text>
              </HStack>
            </HStack>
            <VStack>
              {auditLog.map((auditItem) => (
                <HStack>
                  {auditItem.status == 'SUCCESS' ? (
                    <InfoIcon />
                  ) : (
                    <WarningTwoIcon />
                  )}
                  <Text>{auditItem.action}</Text>
                  <Text>{auditItem.status}</Text>
                  <Text>{auditItem.eventAt.toLocaleString()}</Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        ) : null}
      </Box>
    </>
  );
}
