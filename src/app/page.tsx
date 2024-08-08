'use client';
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex
      bg={useColorModeValue('gray.200', 'gray.600')}
      w="full"
      minH={'80vh'}
      alignItems="center"
      justifyContent="center"
    >
      <SimpleGrid
        maxW="7xl"
        w={{
          md: '3xl',
          lg: '4xl',
        }}
        alignItems="center"
        columns={{
          base: 1,
          lg: 2,
          xl: 3,
        }}
        spacing={4}
        mx="auto"
        py={{
          base: 12,
          lg: 16,
        }}
        px={{
          base: 4,
          lg: 8,
        }}
        display={{
          lg: 'flex',
        }}
      >
        <Box>
          <Text
            color={useColorModeValue('black', 'white')}
            fontSize={{
              base: '3xl',
              sm: '4xl',
            }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="shorter"
            mb={6}
            display="block"
          >
            Guildford Book Store App
          </Text>
          <Text
            color={useColorModeValue('gray.600', 'gray.300')}
            fontSize={{
              base: '3xl',
              sm: '4xl',
            }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="shorter"
            mb={6}
            display="block"
          >
            A bit of an upgrade to use some of the latest technology in the
            store.
          </Text>

          <Divider
            size={'md'}
            borderColor={useColorModeValue('black', 'white')}
          />
          <Text
            fontSize={{
              base: '1xl',
              sm: '2xl',
            }}
            fontWeight="bold"
            lineHeight="shorter"
            mt={3}
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            We have some advanced tech going on for this little old store ^^
          </Text>
        </Box>
      </SimpleGrid>
    </Flex>
  );
}
