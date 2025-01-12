'use client';
import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import CustomDivider from '@/components/Divider/customDivider';
import BookCount from '@/components/BookCount/BookCount';

import BarcodeForm from '@/components/Forms/BarcodeForm';
import EditableResultCard from '@/components/ResultCard/EditableResultCard';
import { BookCountContext } from '../BookCountContext';

const barcodeValidator = z.object({
  barcode: z.string().min(1),
});

type barcodeForm = z.infer<typeof barcodeValidator>;

export default function Activate() {
  const [bookDetails, setBookDetails] = useState<IScannedBookLayout>();
  const { getBookCount } = useContext(BookCountContext);

  const { mutate: barcodeSearch, isLoading } = useMutation({
    mutationFn: async ({ barcode }: barcodeForm) => {
      try {
        const updatedBook = await axios.post('/api/BookAPI/ActivateBook', {
          barcode,
        });
        if (!updatedBook) {
          throw Error();
        }
        setBookDetails(updatedBook.data);
        toast.success('Book Activated Successfully');
      } catch (err: any) {
        toast.error('Something went wrong', {
          description: `${err?.response?.data?.error || (err as any).message}`,
        });
      } finally {
        getBookCount(null);
      }
    },
  });

  return (
    <Box
      p={4}
      bgColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'md'}
    >
      <VStack spacing={4} align={'left'}>
        <Text fontSize="2xl">Activate Book</Text>
        <Text
          fontSize="sm"
          backgroundColor={'#f44336'}
          padding={2}
          borderRadius={6}
          fontWeight={'bold'}
        >
          You are activating this book to add to the physical store shelf :) 📚
        </Text>
        <CustomDivider />
        <BookCount />
        <CustomDivider />
        <BarcodeForm
          isLoading={isLoading}
          barcodeSearch={barcodeSearch}
          formType="Activate"
        />

        {bookDetails && <EditableResultCard {...bookDetails} />}
      </VStack>
    </Box>
  );
}
