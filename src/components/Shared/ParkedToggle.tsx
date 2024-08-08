import React, { useEffect, useState } from 'react';
import { Text, Switch, Flex } from '@chakra-ui/react';
import axios from 'axios';

interface ParkedToggleProps {
  book: IScannedBookLayout;
  fontSize?: string;
  fontWeight?: number;
}

function ParkedToggle({ book, fontSize, fontWeight }: ParkedToggleProps) {
  const [parked, setParked] = useState(book.park);
  const [isLoading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (!book) return;
    setParked(!parked);
  };

  useEffect(() => {
    const handleParkBook = async () => {
      setLoading(true);
      await axios
        .patch('/api/BookAPI/ParkBook', {
          book: book,
          updateData: parked,
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (!book) return;

    handleParkBook();
  }, [parked]);

  if (!book) return <></>;

  return (
    <Flex align="center">
      <Text fontSize={fontSize} fontWeight={fontWeight}>
        Status: {parked ? 'Parked' : 'Active'}
      </Text>
      <Switch
        ml={2}
        disabled={isLoading}
        isChecked={parked}
        onChange={handleToggle}
      />
    </Flex>
  );
}

export default ParkedToggle;
