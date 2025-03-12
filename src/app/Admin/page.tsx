'use client';
import { Box, Button, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

export default function Admin() {
  const [exportedMessage, setExportedMessage] = useState<string | null>(null);

  const handleExport = async () => {
    setExportedMessage(null);
    try {
      const response = await fetch('/api/export', { method: 'POST' });
      const result = await response.json();
      setExportedMessage(result.message);
    } catch (error) {
      setExportedMessage('Failed to export database.');
    }
  };

  return (
    <Box p={4} bgColor={useColorModeValue('gray.200', 'gray.700')} rounded="md">
      <VStack spacing={4} align="left" pb={4}>
        <Text fontSize="2xl">Admin Functions</Text>
        {exportedMessage && <Text>{exportedMessage}</Text>}
        <Button
          size="lg"
          style={{
            backgroundColor: 'lightseagreen',
            color: 'white',
          }}
          onClick={handleExport}
        >
          Export Database
        </Button>
      </VStack>
    </Box>
  );
}
