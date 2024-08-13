import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
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
    <Modal isOpen={isOpen} onClose={handleCloseRequests}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Modal Body</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleCloseRequests}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomerRequestsModal;
