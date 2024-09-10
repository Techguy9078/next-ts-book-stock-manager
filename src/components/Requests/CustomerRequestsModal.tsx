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
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { CustomerBookRequest } from '@prisma/client';
import React, { useEffect, useState } from 'react';

interface CustomerRequestsModalProps {
  customerRequests: CustomerBookRequest[];
  setCustomerRequests: React.Dispatch<
    React.SetStateAction<CustomerBookRequest[]>
  >;
}

const CustomerRequestsModal = ({
  customerRequests,
  setCustomerRequests,
}: CustomerRequestsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (customerRequests?.length) {
      setIsOpen(true);
    }
  }, [customerRequests?.length, setCustomerRequests]);

  const handleCloseRequests = () => {
    setIsOpen(false);
    setCustomerRequests([]);
  };

  console.log(customerRequests);
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseRequests}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      size={'xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customer Request Found</ModalHeader>
        <Text fontSize="md" style={{ color: 'red' }} alignSelf={'center'}>
          The book has still been added even thought a request has been found!
        </Text>
        <ModalBody>
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
                      Request matched by {request.matchedOn}
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
