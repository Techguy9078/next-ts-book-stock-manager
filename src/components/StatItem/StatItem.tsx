import {
  Box,
  Heading,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { SalesStats } from '@prisma/client';

export default function StatItem({
  data,
  bookCount,
}: {
  data: SalesStats;
  bookCount: string;
}) {
  const { date } = data;
  function bookPercentage(inputBook: number) {
    const currentBookCounttoNum = Number(bookCount);
    return (
      Number(inputBook / (currentBookCounttoNum + inputBook)) * 100
    ).toFixed(2);
  }

  return (
    <Box
      p={2}
      w={'50vw'}
      rounded={'md'}
      borderWidth={2}
      borderColor={useColorModeValue('gray.300', 'gray.500')}
    >
      <Heading pl={2} size={'md'}>
        {date.toLocaleString()}
      </Heading>
      <StatGroup pt={1}>
        <Stat
          p={2}
          rounded={'md'}
          borderWidth={2}
          borderColor={useColorModeValue('gray.300', 'gray.500')}
        >
          <StatLabel>Added Books</StatLabel>
          <StatNumber>{data.addedBooks}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {bookPercentage(data.addedBooks)}%
          </StatHelpText>
        </Stat>

        <Stat
          p={2}
          rounded={'md'}
          borderWidth={2}
          borderColor={useColorModeValue('gray.300', 'gray.500')}
        >
          <StatLabel>Removed Books</StatLabel>
          <StatNumber>{data.removedBooks}</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            {bookPercentage(data.removedBooks)}%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
}
