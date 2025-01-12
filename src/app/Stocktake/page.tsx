'use client';
import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  Button,
  Grid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import EditableResultCard from '@/components/ResultCard/EditableResultCard';
import BarcodeForm from '@/components/Forms/BarcodeForm';
import StocktakeModal from '@/components/Modals/StocktakeModal';

type StocktakeStages = 'scan' | 'not-found' | 'manual' | 'found';

export default function Stocktake() {
  const [barcode, setBarcode] = useState<string | undefined>(undefined);
  const [books, setBooks] = useState<IScannedBookLayout[]>([]);
  const [stage, setStage] = useState<StocktakeStages>('scan');
  const [isManualModalOpen, setManualModalOpen] = useState(false);
  const fetchBookDetails = async (
    barcode: string,
  ): Promise<IScannedBookLayout | null> => {
    console.log('fetchBookDetails', barcode);
    setBarcode(barcode);
    try {
      // Fetch book from external API
      const { data } = await axios.get<IScannedBookLayout>(
        `/api/BookAPI/APIBookSearch?barcode=${barcode}`,
      );
      if (data) return data;
    } catch {
      try {
        // Fallback to custom API
        const { data } = await axios.get<IScannedBookLayout>(
          `/api/BookAPI/CustomAPIBookSearch?barcode=${barcode}`,
        );
        return data;
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const addBookToDatabase = async (book: IScannedBookLayout) => {
    try {
      const { data } = await axios.post('/api/BookAPI/Book', book);
      setBooks((prev) => [...prev, data]);
      toast.success('Book added successfully.');
    } catch {
      toast.error('Failed to add book to the database.');
    }
  };

  const { mutate: barcodeSearch, isLoading } = useMutation({
    mutationFn: async (barcode: string) => {
      setBooks([]);
      // Search for exact match in database
      const response = await axios.get<IScannedBookLayout[]>(
        `/api/BookAPI/Stocktake?barcode=${barcode}`,
      );
      if (response.data.length > 0) {
        setBooks(response.data);
        setStage('found');
        return;
      }

      // If book not found, fetch details from external APIs
      const bookDetails = await fetchBookDetails(barcode);

      // If details found, do a check of the book in the database based on other details
      if (bookDetails) {
        const searchString = `${bookDetails.title} ${bookDetails.author} ${bookDetails.isbn} ${bookDetails.barcode}`;
        const { data } = await axios.get<IScannedBookLayout[]>(
          `/api/BookAPI/Stocktake?search=${searchString}`,
        );
        if (data.length > 0) {
          setBooks(data);
          setStage('found');
          return;
        }
      }

      if (bookDetails) {
        await addBookToDatabase(bookDetails);
        setBooks([bookDetails]);
        setStage('found');
      } else {
        // If details not found, request manual entry
        setStage('not-found');
      }
    },
    onError: () => {
      toast.error('An error occurred during barcode search.');
    },
  });

  const handleManualAdd = async (manualBookData: IScannedBookLayout) => {
    try {
      const { data } = await axios.post('/api/BookAPI/Book', manualBookData);
      toast.success('Book added manually.');
      setManualModalOpen(false);
      setStage('found');
      setBooks([data]);
      setBarcode(undefined);
    } catch {
      toast.error('Failed to add book manually.');
    }
  };

  console.log(barcode);
  console.log(books);
  return (
    <Box
      p={4}
      bgColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'md'}
      height={'calc(100vh - 100px)'}
      overflow={'auto'}
    >
      <VStack spacing={4} align="left">
        <Text fontSize="2xl">Stocktake</Text>

        {/* Barcode Scanner */}
        <BarcodeForm
          isLoading={isLoading}
          barcodeSearch={(data: any) => barcodeSearch(data.barcode)}
          formType="Stocktake"
        />

        {/* Display Found Books */}
        {stage === 'found' && books.length > 0 && (
          <>
            <Text fontSize="md">
              {books.length} {books.length > 1 ? 'books' : 'book'} found
            </Text>
            <Grid
              templateColumns={{
                base: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={4}
            >
              {books?.length &&
                books.map((book) => (
                  <EditableResultCard
                    key={book.id}
                    {...book}
                    maxWidth="100%"
                    isStocktake
                    setBookDeleted={(deletedBook: IScannedBookLayout) => {
                      const updateBooks = books.filter(
                        (book) => book.id !== deletedBook.id,
                      );
                      setBooks(updateBooks);
                    }}
                  />
                ))}
            </Grid>
          </>
        )}

        {/* Not Found Handling */}
        {stage === 'not-found' && (
          <>
            <Text>Book not found. Please add details manually.</Text>
            <Button
              colorScheme="blue"
              onClick={() => setManualModalOpen(true)}
              style={{
                backgroundColor: '#60a5fa',
                color: 'white',
                height: '48px',
              }}
            >
              Add Manually
            </Button>
          </>
        )}

        {/* Manual Entry Modal */}
        <StocktakeModal
          isOpen={isManualModalOpen}
          onClose={() => setManualModalOpen(false)}
          onSubmit={(book) => {
            handleManualAdd(book);
          }}
        />
      </VStack>
    </Box>
  );
}
