'use client';
import { BookCountContext } from '@/app/BookCountContext';
import { HStack, Text } from '@chakra-ui/react';
import { useContext } from 'react';

export default function BookCount() {
  const { currentBookCount } = useContext(BookCountContext);
  return (
    <HStack>
      <Text fontSize={{ base: 'sm', md: '2xl' }}>Current Book Count: </Text>
      <Text fontSize={{ base: 'sm', md: '2xl' }}>{currentBookCount}</Text>
    </HStack>
  );
}
