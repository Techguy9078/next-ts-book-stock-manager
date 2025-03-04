'use client';
import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  Button,
  Grid,
  Flex,
  Switch,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import EditableResultCard from '@/components/ResultCard/EditableResultCard';
import BarcodeForm from '@/components/Forms/BarcodeForm';
import StocktakeModal from '@/components/Modals/StocktakeModal';
import { CustomerBookRequest } from '@prisma/client';
import CustomerRequestsModal from '@/components/Requests/CustomerRequestsModal';

type StocktakeStages = 'scan' | 'not-found' | 'manual' | 'found';

export default function Stocktake() {
  const [books, setBooks] = useState<IScannedBookLayout[]>([]);
  const [similarBooks, setSimilarBooks] = useState<IScannedBookLayout[]>([]);
  const [stage, setStage] = useState<StocktakeStages>('scan');
  const [isManualModalOpen, setManualModalOpen] = useState(false);
  const [customerRequests, setCustomerRequests] = useState<
    CustomerBookRequest[]
  >([]);
  const [isParked, setIsParked] = useState(false);

  const searchRequests = async (bookData: IScannedBookLayout) => {
    const { isbn, barcode, author, title } = bookData;

    try {
      const response = await axios.get(
        '/api/CustomerBookRequestAPI/CustomerRequestLookup',
        {
          params: { isbn, barcode, author, title },
        },
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

  const fetchBookFromAPI = async (
    barcode: string,
  ): Promise<IScannedBookLayout[] | null> => {
    try {
      const { data } = await axios.get<IScannedBookLayout[]>(
        `/api/BookAPI/Stocktake?barcode=${barcode}`,
      );
      return data.length > 0 ? data : null;
    } catch (error) {
      console.error('Error fetching book from API:', error);
      return null;
    }
  };

  const fetchBookDetails = async (
    barcode: string,
  ): Promise<IScannedBookLayout | null> => {
    try {
      const { data } = await axios.get<IScannedBookLayout>(
        `/api/BookAPI/APIBookSearch?barcode=${barcode}`,
      );
      return data;
    } catch {
      try {
        const { data } = await axios.get<IScannedBookLayout>(
          `/api/BookAPI/CustomAPIBookSearch?barcode=${barcode}`,
        );
        return data;
      } catch {
        return null;
      }
    }
  };

  const findSimilarBooks = async (
    book: IScannedBookLayout,
  ): Promise<IScannedBookLayout[] | null> => {
    const searchString = book.title; // Only search by title but can be expanded to include author as using a string similarity algorithm
    try {
      const { data } = await axios.get<IScannedBookLayout[]>(
        `/api/BookAPI/Stocktake?search=${searchString}`,
      );
      return data.length > 0 ? data : null;
    } catch (error) {
      console.error('Error finding similar books:', error);
      return null;
    }
  };

  const addBookToDatabase = async (
    book: IScannedBookLayout,
  ): Promise<IScannedBookLayout | null> => {
    try {
      const { data } = await axios.post('/api/BookAPI/Book', book);
      setBooks([...books, data]);
      toast.success('Book added successfully.');
      setStage('found');
      return data;
    } catch (error) {
      console.error('Failed to add book:', error);
      toast.error('Failed to add book to the database, Try manual add.');
      setStage('not-found');
      setManualModalOpen(true);
      setBooks([]);
      return null;
    }
  };

  const handleSimilarBook = async (book: IScannedBookLayout) => {
    if (!book) return;

    const similarBooks = await findSimilarBooks(book);
    if (similarBooks) {
      const filteredBooks = similarBooks.filter(
        (similarBook) => similarBook.isbn !== book.isbn,
      );
      setSimilarBooks(filteredBooks);
    }
  };

  // Quick and dirty to stop accidental string entry
  function isNumeric(str: string): boolean {
    return /^\d+$/.test(str);
  }

  const { mutate: barcodeSearch, isLoading } = useMutation({
    mutationFn: async (barcode: string) => {
      const barcodeTrimmed = barcode?.trim();
      if (!isNumeric(barcodeTrimmed)) {
        toast.error('Invalid barcode');
        return;
      }

      // Reset the state
      setBooks([]);
      setSimilarBooks([]);
      setStage('scan');

      // 1 Search in the database
      const storedBooks = await fetchBookFromAPI(barcode);
      if (storedBooks) {
        await addBookToDatabase(storedBooks[0]);
        await handleSimilarBook(storedBooks[0]);
        setBooks(storedBooks);
        searchRequests(storedBooks[0]);
        return;
      }

      // 2 Fetch from external API
      const externalBook = await fetchBookDetails(barcode);
      if (externalBook) {
        const savedBook = await addBookToDatabase(externalBook);
        // check for similar books after saving
        if (savedBook) {
          handleSimilarBook(savedBook);
          setBooks([savedBook]);
          searchRequests(savedBook);
        }
        return;
      }

      setStage('not-found');
      setManualModalOpen(true);
    },
    onError: () => {
      toast.error('An error occurred during barcode search.');
    },
  });

  const handleManualAdd = async (manualBookData: IScannedBookLayout) => {
    try {
      const { data } = await axios.post('/api/BookAPI/Book', manualBookData);
      toast.success('Book added manually.');
      setBooks([data]);
      handleSimilarBook(data);
      setStage('found');
      setManualModalOpen(false);
      searchRequests(data);
    } catch {
      toast.error('Failed to add book manually.');
    }
  };

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
        <Flex align="center">
          <Text fontSize="md" fontWeight={500}>
            Status: {isParked ? 'Parked' : 'Active'}
          </Text>
          <Switch
            ml={2}
            disabled={isLoading}
            isChecked={isParked}
            onChange={() => setIsParked((prev) => !prev)}
          />
        </Flex>
        <BarcodeForm
          isLoading={isLoading}
          barcodeSearch={(data: any) => barcodeSearch(data.barcode)}
          formType="Stocktake"
        />

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
            {books?.length && similarBooks?.length ? (
              <>
                <Text fontSize="md">
                  Similar {similarBooks.length}{' '}
                  {similarBooks.length > 1 ? 'books' : 'book'} found
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
                  {similarBooks.map((book) => (
                    <EditableResultCard
                      key={book.id}
                      {...book}
                      maxWidth="100%"
                      isStocktake
                      setBookDeleted={(deletedBook: IScannedBookLayout) => {
                        const updateBooks = books.filter(
                          (book) => book.id !== deletedBook.id,
                        );
                        setSimilarBooks(updateBooks);
                      }}
                    />
                  ))}
                </Grid>
              </>
            ) : null}
          </>
        )}

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

        <StocktakeModal
          isOpen={isManualModalOpen}
          onClose={() => {
            setManualModalOpen(false);
            setStage('scan');
          }}
          onSubmit={(book) => {
            handleManualAdd(book);
          }}
        />

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
