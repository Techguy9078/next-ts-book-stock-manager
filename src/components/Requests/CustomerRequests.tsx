import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { CustomerBookRequest } from '@prisma/client';

interface CustomerRequestsProps {
  requests: Array<CustomerBookRequest>;
  loading: boolean;
  removeRequest: (id: string) => void;
}

export default function CustomerRequests({
  requests,
  loading,
  removeRequest,
}: CustomerRequestsProps) {
  const handleCreatedDate = (date: string | number | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-AU');
  };

  return (
    <Box
      overflowY={'scroll'}
      maxHeight={'50vh'}
      fontSize={{ sm: 'sm', md: 'md' }}
      sx={{
        '::-webkit-scrollbar': {
          width: '4px',
        },
        '::-webkit-scrollbar-track': {
          bgColor: useColorModeValue('gray.300', 'gray.600'),
          borderRadius: '100px',
        },
        '::-webkit-scrollbar-thumb': {
          bgColor: useColorModeValue('gray.400', 'gray.800'),
          borderRadius: '100px',
        },
      }}
    >
      <Table size="md">
        <Thead
          borderWidth={2}
          borderColor={useColorModeValue('gray.300', 'gray.600')}
          position={'sticky'}
          top={-0.5}
          zIndex={2}
          sx={{
            '@media screen and (max-width: 600px)': {
              display: 'none',
            },
          }}
        >
          <Tr>
            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>Date</Th>
            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>Name</Th>
            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>Phone</Th>

            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>Request</Th>

            <Th bgColor={useColorModeValue('gray.300', 'gray.800')}>Delete</Th>
          </Tr>
        </Thead>
        {requests.length > 0 && (
          <Tbody>
            {requests.map((request) => (
              <Tr key={request.id}>
                <Td>{handleCreatedDate(request.createdAt)}</Td>
                <Td>{request.requestName}</Td>
                <Td>{request.requestNumber}</Td>

                <Td>
                  <Flex>
                    {request.requestISBN && `ISBN: ${request.requestISBN}`}
                    {request.requestISBN && <br />}
                    {request.requestTitle && `Title: ${request.requestTitle}`}
                    {request.requestTitle && <br />}
                    {request.requestAuthor &&
                      `Author: ${request.requestAuthor}`}
                    {request.requestAuthor && <br />}
                    {request.requestComment &&
                      `Comment: ${request.requestComment}`}
                  </Flex>
                </Td>
                <Td>
                  <Button
                    isLoading={loading}
                    loadingText={'Removing Book...'}
                    className={'bg-red-400'}
                    color={'white'}
                    _hover={{
                      bgColor: 'red.600',
                      color: useColorModeValue('gray.300', 'gray.300'),
                    }}
                    w={'100%'}
                    size="md"
                    px={2}
                    onClick={() => removeRequest(request.id.toString())}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </Box>
  );
}
