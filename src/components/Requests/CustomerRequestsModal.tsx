import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { CustomerBookRequest } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';

interface CustomerRequestsModalProps {
  customerRequests: CustomerBookRequest[];
  setCustomerRequests: React.Dispatch<
    React.SetStateAction<CustomerBookRequest[]>
  >;
  isStocktake?: boolean;
}

const CustomerRequestsModal = ({
  customerRequests,
  setCustomerRequests,
  isStocktake,
}: CustomerRequestsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (customerRequests?.length) {
      setIsOpen(true);
      if (modalBodyRef.current) {
        modalBodyRef.current.scrollTop = 0;
      }
    }
  }, [customerRequests?.length, setCustomerRequests]);

  const handleCloseRequests = () => {
    setIsOpen(false);
    setCustomerRequests([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseRequests}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      size={'xl'}
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent height={'auto'} maxHeight={'80vh'}>
        <ModalHeader>Customer Request Found</ModalHeader>
        {!isStocktake ? (
          <Text
            fontSize="md"
            style={{ color: 'red' }}
            alignSelf={'center'}
            margin={1}
            textAlign={'center'}
          >
            The book has still been added even though a request has been found!
          </Text>
        ) : (
          <Text
            fontSize="md"
            style={{ color: 'red' }}
            alignSelf={'center'}
            margin={1}
            textAlign={'center'}
          >
            Book not added!
          </Text>
        )}
        <ModalBody ref={modalBodyRef} w={'auto'} overflow={'auto'}>
          {customerRequests?.map((request, index) => (
            <Card key={index} border={'1px solid rgba(255,255,255,0.3)'} my={2}>
              <CardBody>
                <Heading size="md">
                  {request.requestName} may be looking for this book
                </Heading>
                <Stack divider={<StackDivider />} spacing="2">
                  <StackDivider />
                  <Box>
                    <Heading pt={1} size="xs" textTransform="uppercase">
                      Summary
                    </Heading>
                    <Text pt="2" fontSize="md">
                      Requested on{' '}
                      {new Date(request.createdAt).toLocaleDateString()}
                    </Text>
                    <Text pt="2" fontSize="md">
                      {/* @ts-ignore */}
                      Request matched on {request.matchedOn}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Original Request Details
                    </Heading>
                    <Text pt="1" fontSize="sm">
                      {request.requestISBN && 'ISBN: ' + request.requestISBN}
                    </Text>
                    <Text pt="1" fontSize="sm">
                      {request.requestTitle && 'Title: ' + request.requestTitle}
                    </Text>
                    <Text pt="1" fontSize="sm">
                      {request.requestAuthor &&
                        'Author: ' + request.requestAuthor}
                    </Text>
                    <Text pt="1" fontSize="sm">
                      {request.requestComment &&
                        'Comment: ' + request.requestComment}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Contact Number
                    </Heading>
                    <Text pt="1" fontSize="sm">
                      {request.requestNumber}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: '#ff0000d9' }}
            onClick={handleCloseRequests}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomerRequestsModal;
