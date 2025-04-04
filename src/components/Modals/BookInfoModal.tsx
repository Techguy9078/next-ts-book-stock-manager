import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';

import { Prisma } from '@prisma/client';
import ResultItem from '../ResultCard/ResultItem';

type StoredBooksWithAnalytics = Prisma.StoredBooksGetPayload<{
  include: { Analytics: true };
}>;

interface BookInfoModalProps {
  book: StoredBooksWithAnalytics;
}

const BookStats = ({ book }: { book: StoredBooksWithAnalytics }) => {
  return (
    <StatGroup>
      <Stat>
        <StatLabel>Added</StatLabel>
        <StatNumber>
          {book.Analytics.filter((analytic) => analytic.action == 'ADD').length}
        </StatNumber>
      </Stat>

      <Stat>
        <StatLabel>Removed</StatLabel>
        <StatNumber>
          {
            book.Analytics.filter((analytic) => analytic.action == 'REMOVE')
              .length
          }
        </StatNumber>
      </Stat>
    </StatGroup>
  );
};

const BookInfo = ({ book }: { book: StoredBooksWithAnalytics }) => {
  return (
    <Box
      p={5}
      maxW={'500px'}
      // w={"full"}
      bg={useColorModeValue('gray.100', 'gray.600')}
      boxShadow={'xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
    >
      <Stack align={'Left'}>
        <Heading fontSize={'2xl'} fontWeight={600}>
          {book.title}
        </Heading>
        <Divider borderColor={useColorModeValue('black', 'white')} />
        <Stack>
          <ResultItem
            barcode={book.barcode}
            cardBodyName={'Author'}
            field={'author'}
            item={book.author}
          />
          <ResultItem
            barcode={book.barcode}
            cardBodyName={'Genre'}
            field={'genre'}
            item={book.genre}
          />
          <ResultItem
            barcode={book.barcode}
            cardBodyName={'ISBN'}
            field={'isbn'}
            item={book.isbn}
          />
          <ResultItem
            barcode={book.barcode}
            cardBodyName={'Barcode'}
            field={'barcode'}
            item={book.barcode}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

const BookInfoModal = ({ book }: BookInfoModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Check Book</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BookInfo book={book} />
            <BookStats book={book} />
          </ModalBody>
          <ModalFooter>
            <Button
              paddingInline={10}
              style={{
                backgroundColor: '#ff0000d9',
              }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookInfoModal;
