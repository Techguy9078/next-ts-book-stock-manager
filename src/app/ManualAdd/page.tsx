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
import { createStandaloneToast } from '@chakra-ui/react';
const { ToastContainer, toast } = createStandaloneToast();

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

export default function ManualAdd() {
  const [bookDetails, setBookDetails] = useState<IScannedBookLayout>();
  const { getBookCount } = useContext(BookCountContext);

  const { register, reset, handleSubmit } = useForm<IScannedBookLayout>();

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
      getBookCount(null);
      setBookDetails(data);
      reset();

      await axios.put('/api/SalesAPI/SalesStats', {
        updateField: 'addBook',
        book: data
      });

      return toast({
        id: 'success',
        position: 'top-right',
        status: 'success',
        duration: 3000,
        title: 'Added Book',
        description: 'Book added successfully!',
      });
    },
    onError: (err: AnySoaRecord) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
          setBookDetails(undefined);

          return toast({
            id: 'warning',
            position: 'top-right',
            status: 'warning',
            duration: 3000,
            title: 'Adding Book Failed',
            description: 'Error Adding Book Manually!',
          });
        }
      }

      setBookDetails(undefined);

      return toast({
        id: 'error',
        position: 'top-right',
        status: 'error',
        duration: 3000,
        title: 'Something Went Wrong Try Again',
        description:
          'Try entering the book again, if this keeps happening contact the TECH GUY',
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

      {/* Use For Images */}
      {/* {bookDetails?.isbn && (
				<Image
					src={`https://covers.openlibrary.org/b/isbn/${bookDetails.isbn}-M.jpg?default=false`}
					alt=""
				/>
			)} */}
      <ToastContainer />
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
