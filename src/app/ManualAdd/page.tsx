'use client';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import ResultCard from '@/components/ResultCard/ResultCard';
import axios, { AxiosError } from 'axios';
import CustomDivider from '@/components/Divider/customDivider';
import BookCount from '@/components/BookCount/BookCount';
import { ManualBookDataParse } from '@/components/_helpers/DataParse';
import { AnySoaRecord } from 'dns';
import { useMutation } from '@tanstack/react-query';
import { BookCountContext } from '../BookCountContext';
import GenericButton from '@/components/Buttons/GenericButton';
import { genreList } from '@/config/genreList';
import { CustomerBookRequest } from '@prisma/client';
import CustomerRequestsModal from '@/components/Requests/CustomerRequestsModal';

export default function ManualAdd() {
  const [bookDetails, setBookDetails] = useState<IScannedBookLayout>();
  const { getBookCount } = useContext(BookCountContext);

  const { register, reset, handleSubmit } = useForm<IScannedBookLayout>();

  const [customerRequests, setCustomerRequests] = useState<
    CustomerBookRequest[]
  >([]);

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

  const { mutate: formSubmit, isLoading } = useMutation({
    mutationFn: async (formData: IScannedBookLayout) => {
      const parsedData = await ManualBookDataParse(formData);
      const { data } = await axios.post('/api/BookAPI/Book', parsedData);

      if (!data) {
        throw Error();
      }

      return data as IScannedBookLayout;
    },
    onSuccess: async (data) => {
      await searchRequests(data);

      getBookCount(null);
      setBookDetails(data);
      reset();

      return toast.success('Added Book', {
        description: 'Book added successfully!',
      });
    },
    onError: (err: AnySoaRecord) => {
      if (err instanceof AxiosError) {
        console.log(err);
        if (err.response?.status === 500) {
          setBookDetails(undefined);

          return toast.error('Adding Book Failed', {
            description:
              'Book details have not been found, please enter manually!',
          });
        }
      }

      setBookDetails(undefined);

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
        <Text fontSize="2xl">Manual Add Books</Text>
        <CustomDivider />
        <BookCount />
        <CustomDivider />
        <form onSubmit={handleSubmit((data) => formSubmit(data))}>
          <FormLabel>
            Manually enter the book details to add them to the database:
            <VStack>
              {manualInputs.map(({ placeholder, inputname }, i) => (
                <FormControl key={i}>
                  <InputGroup>
                    <InputLeftAddon inlineSize={110}>
                      {inputname.charAt(0).toUpperCase() +
                        inputname.slice(1) +
                        ':'}
                    </InputLeftAddon>
                    <Input
                      borderColor={'gray.400'}
                      id={inputname}
                      autoComplete="off"
                      placeholder={placeholder}
                      {...register(inputname, {
                        required: true,
                      })}
                    />
                  </InputGroup>
                </FormControl>
              ))}
              <FormControl key={123}>
                <InputGroup>
                  <InputLeftAddon inlineSize={110}>Genre:</InputLeftAddon>
                  <Select
                    borderColor={'gray.400'}
                    color={'gray.400'}
                    {...register('genre', {
                      required: true,
                    })}
                    placeholder={'Select The Genre...'}
                  >
                    {genreList.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
              </FormControl>
            </VStack>
          </FormLabel>

          <GenericButton isLoading={isLoading} buttonType="Add" />
        </form>

        {bookDetails && <ResultCard {...bookDetails} />}
      </VStack>

      {customerRequests?.length ? (
        <CustomerRequestsModal
          customerRequests={customerRequests}
          setCustomerRequests={setCustomerRequests}
        />
      ) : null}
    </Box>
  );
}

const manualInputs: Array<IManualInputs> = [
  { inputname: 'barcode', placeholder: 'Enter Barcode...' },
  { inputname: 'isbn', placeholder: 'Enter ISBN...' },
  {
    inputname: 'title',
    placeholder: 'Enter Books Full Title...',
  },
  {
    inputname: 'author',
    placeholder: "Enter Author's Full Name...",
  },
];

interface IManualInputs {
  inputname: 'barcode' | 'isbn' | 'title' | 'author' | 'genre';
  placeholder: string;
}
