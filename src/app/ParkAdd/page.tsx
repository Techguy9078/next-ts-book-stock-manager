'use client';
import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { AnySoaRecord } from 'dns';

import { toast } from 'sonner';

import CustomDivider from '@/components/Divider/customDivider';
import BookCount from '@/components/BookCount/BookCount';

import BarcodeForm from '@/components/Forms/BarcodeForm';
import EditableResultCard from '@/components/ResultCard/EditableResultCard';
import { BookCountContext } from '../BookCountContext';
import { CustomerBookRequest } from '@prisma/client';
import CustomerRequestsModal from '@/components/Requests/CustomerRequestsModal';
import { useAnalytics } from '@/components/_helpers/AnalyticsHelper';

const barcodeValidator = z.object({ barcode: z.string().min(1) });

type barcodeForm = z.infer<typeof barcodeValidator>;

export default function ParkAdd() {
  const [bookDetails, setBookDetails] = useState<IScannedBookLayout>();
  const [customerRequests, setCustomerRequests] = useState<
    CustomerBookRequest[]
  >([]);

  const { getBookCount } = useContext(BookCountContext);

  const searchRequests = async (bookData: IScannedBookLayout) => {
    const { isbn, barcode, author, title } = bookData;

    try {
      const response = await axios.get(
        '/api/CustomerBookRequestAPI/CustomerRequestLookup',
        { params: { isbn, barcode, author, title } },
      );

      const rankedResults = response.data;
      if (rankedResults.length) {
        setCustomerRequests(rankedResults);
      }
    } catch (error) {
      toast.error('Error searching for customer requests', {
        description: `${error}`,
      });
    }
  };

  const { mutate: barcodeSearch, isLoading } = useMutation({
    mutationFn: async ({ barcode }: barcodeForm) => {
      setBookDetails(undefined);
      try {
        const { data } = await axios.get(
          `/api/BookAPI/APIBookSearch?barcode=${barcode}`,
        );

        if (!data) {
          throw Error();
        }

        return data as IScannedBookLayout;
      } catch {
        const { data } = await axios.get(
          `/api/BookAPI/CustomAPIBookSearch?barcode=${barcode}`,
        );

        if (!data) {
          throw Error();
        }

        return data as IScannedBookLayout;
      }
    },
    onSuccess: async (data: IScannedBookLayout) => {
      const book = await axios.post('/api/BookAPI/Book', data);

      const analyticData = await useAnalytics({
        action: 'ADD',
        status: 'SUCCESS',
        storedBooksBarcode: data.barcode,
        information: 'Book was Added',
      });

      console.log(analyticData);
      await searchRequests(book.data);

      getBookCount(null);
      setBookDetails(book.data);
      return toast.success('Added Book', {
        description: 'Book added successfully!',
      });
    },
    onError: (err: AnySoaRecord) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
          setBookDetails(undefined);

          return toast.error('Adding Book Failed', {
            description:
              'Book details have not been found, please enter manually!',
          });
        }
      }

      setBookDetails(undefined);

      console.log(err);

      return toast.error('Something Went Wrong Try Again', {
        description:
          'Try Scanning the book again, if this keeps happening contact the TECH GUY',
      });
    },
  });

  return (
    <Box
      p={4}
      bgColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'md'}
    >
      <VStack spacing={4} align={'left'}>
        <Text fontSize="2xl">Park Add Books</Text>
        <CustomDivider />
        <BookCount />
        <CustomDivider />
        <BarcodeForm
          isLoading={isLoading}
          barcodeSearch={barcodeSearch}
          formType="Add"
        />

        {bookDetails && <EditableResultCard {...bookDetails} />}
        {customerRequests?.length ? (
          <CustomerRequestsModal
            customerRequests={customerRequests}
            setCustomerRequests={setCustomerRequests}
          />
        ) : null}
      </VStack>
    </Box>
  );
}
