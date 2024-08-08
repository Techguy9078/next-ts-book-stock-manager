import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Divider,
  HStack,
} from '@chakra-ui/react';

function ResultItem({
  item,
  cardBodyName,
}: {
  item: string | null;
  cardBodyName: string;
}) {
  if (item != '') {
    return (
      <HStack>
        <Text fontWeight={700}>{cardBodyName}:</Text>
        <Text fontWeight={600}>{item}</Text>
      </HStack>
    );
  }
  return;
}

export default function ResultCard({
  title,
  barcode,
  isbn,
  author,
  genre,
}: IScannedBookLayout) {
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
          {title && title}
        </Heading>
        <Divider borderColor={useColorModeValue('black', 'white')} />
        <Stack>
          <ResultItem cardBodyName={'Author'} item={author} />
          <ResultItem cardBodyName={'Genre'} item={genre} />
          <ResultItem cardBodyName={'ISBN'} item={isbn} />
          <ResultItem cardBodyName={'Barcode'} item={barcode} />
        </Stack>
      </Stack>
    </Box>
  );
}
