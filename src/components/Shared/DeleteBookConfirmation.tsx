import React, { useState } from 'react';
import {
  Text,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { toast } from 'sonner';

interface DeleteBookConfirmationProps {
  book: IScannedBookLayout;
  onDelete?: (deletedBook: IScannedBookLayout) => void;
  deleteById?: boolean;
}

function DeleteBookConfirmation({
  book,
  onDelete,
  deleteById,
}: DeleteBookConfirmationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!book) return;
    setLoading(true);

    try {
      const { data } = deleteById
        ? await axios.delete(`/api/BookAPI/Book?id=${book.id}`).then((res) => {
            onDelete && onDelete(book);
            return res;
          })
        : await axios
            .delete(`/api/BookAPI/Book?barcode=${book.barcode}`)
            .then((res) => {
              onDelete && onDelete(book);
              return res;
            });
      toast.success('A Book Was Deleted', {
        description: `Deleted a book: ${data?.title}`,
      });
    } catch (error) {
      toast.error('Something went wrong', {
        description: `Error: ${error}`,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!book) return null;

  return (
    <>
      <Flex align="center">
        <Button
          isLoading={isLoading}
          loadingText={'Deleting...'}
          color={'white'}
          w={'100%'}
          size="md"
          px={5}
          type="submit"
          onClick={onOpen}
          style={{ cursor: 'pointer', backgroundColor: 'red' }}
        >
          Delete Book
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete this record for {book.title}?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Flex align="center">
              <Button
                isLoading={isLoading}
                loadingText={'Deleting...'}
                color={'white'}
                w={'100%'}
                size="lg"
                px={10}
                type="submit"
                onClick={handleDelete}
                style={{ cursor: 'pointer', backgroundColor: 'red' }}
                ml={3}
              >
                Confirm Delete
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteBookConfirmation;
