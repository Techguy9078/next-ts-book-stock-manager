'use client';
import {
  Box,
  FormLabel,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import CustomDivider from '@/components/Divider/customDivider';
import axios from 'axios';
import { CustomerBookRequest } from '@prisma/client';

export default function SearchRequests() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [customers, setCustomers] = useState<Array<CustomerBookRequest>>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function FindCustomer() {
      if (search == '') return setCustomers(undefined);
      try {
        let customerResults = await axios.get(
          `/api/CustomerBookRequestAPI?search=${search}`,
          {
            signal: signal,
          },
        );
        return setCustomers(customerResults.data);
      } catch {
        return;
      }
    }
    FindCustomer();

    return () => {
      controller.abort();
    };
  }, [search, reload]);

  function handleRerender() {
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 2000);
  }

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
            Find Customer in database:
            <Input
              ref={searchInputRef}
              borderColor={'gray.400'}
              autoFocus
              autoComplete="off"
              name={'searchbox'}
              type="text"
              value={search}
              placeholder="Enter Customer to search for..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormLabel>
        </form>
      </VStack>

      {/* {customers && (
				<CustomerTable
					customerArray={customers}
					handleRerender={handleRerender}
				/>
			)} */}
    </Box>
  );
}
