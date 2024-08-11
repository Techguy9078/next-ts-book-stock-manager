'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Box,
  FormLabel,
  Input,
  Text,
  VStack,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { toast } from 'sonner';
import CustomDivider from '@/components/Divider/customDivider';
import axios from 'axios';
import { CustomerBookRequest } from '@prisma/client';
import CustomerRequests from '@/components/Requests/CustomerRequests';

export default function SearchCustomerRequests() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState<string>('');
  const [requests, setRequests] = useState<Array<CustomerBookRequest> | null>(
    null,
  );
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const findCustomer = async () => {
      try {
        const customerResults = await axios.get(
          `/api/CustomerBookRequestAPI?search=${search}`,
          {
            signal: signal,
          },
        );

        const results = customerResults.data;
        setRequests(results);

        if (results.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      } catch {
        setRequests(null);
        setNoResults(true);
      }
    };

    if (search !== '') {
      findCustomer();
    } else {
      setRequests([]);
      setNoResults(false);
    }

    return () => {
      controller.abort();
    };
  }, [search]);

  const removeRequest = async (requestId: string) => {
    setLoading(true);
    await axios
      .delete(`/api/CustomerBookRequestAPI?id=${requestId}`)
      .then(() => {
        toast.success('Request has been removed successfully');
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.error || (err as any).message || 'Unknown Error',
        );
      })
      .finally(() => {
        setSearch('');
        searchInputRef.current?.focus();
        setLoading(false);
      });
  };

  return (
    <Box
      p={4}
      bgColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'md'}
    >
      <VStack spacing={4} align={'left'} pb={4}>
        <Text fontSize="2xl">Search for customers</Text>
        <CustomDivider />
        <form>
          <FormLabel>
            Search Customers:
            <Input
              ref={searchInputRef}
              borderColor={'gray.400'}
              autoFocus
              autoComplete="off"
              name={'searchbox'}
              type="text"
              value={search}
              placeholder="Search by name, number, title, author, or ISBN..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormLabel>
        </form>
      </VStack>

      {noResults && (
        <Alert status="warning" borderRadius={6} w={'fit-content'}>
          <AlertIcon />
          No customer requests found.
        </Alert>
      )}

      {requests && requests.length > 0 && (
        <Box mt={4}>
          {requests && (
            <CustomerRequests
              requests={requests}
              loading={loading}
              removeRequest={removeRequest}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
