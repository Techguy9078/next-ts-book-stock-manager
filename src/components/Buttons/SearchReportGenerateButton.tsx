import { Button, useColorModeValue } from '@chakra-ui/react';
import { createSearchReport } from '@/components/Report/ReportGenerator';

export default function SearchReportGenerateButton({
  searchData,
}: {
  searchData: Array<IScannedBookLayout>;
}) {
  return (
    <Button
      className={'bg-green-400'}
      color={'white'}
      _hover={{
        bgColor: 'green.600',
        color: useColorModeValue('gray.300', 'gray.300'),
      }}
      size="md"
      onClick={() =>
        createSearchReport({
          searchData: searchData,
        })
      }
    >
      Print Search
    </Button>
  );
}
