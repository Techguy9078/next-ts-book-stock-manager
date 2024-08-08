import { Button } from '@chakra-ui/react';

export default function RemoveButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button
      isLoading={isLoading}
      loadingText={'Removing Book...'}
      className={'bg-red-300'}
      color={'white'}
      _hover={{ bgColor: 'red.300', color: 'gray.900' }}
      w={'100%'}
      size="lg"
      px={10}
      mt={2}
      type="submit"
    >
      Remove
    </Button>
  );
}
