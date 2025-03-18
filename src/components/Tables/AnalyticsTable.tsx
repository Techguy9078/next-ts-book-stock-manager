import { CheckIcon, InfoIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Analytics } from '@prisma/client';

export default function AnalyticsTable({
  analyticsData,
}: {
  analyticsData: Array<Analytics> | undefined;
}) {
  return (
    <>
      {analyticsData?.length == 0 ? (
        <Text fontSize="1xl">No Analytics Found Here...</Text>
      ) : analyticsData ? (
        <TableContainer overflowY={'scroll'} maxH={'65vh'}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Status Icon</Th>
                <Th>Action</Th>
                <Th>Status</Th>
                <Th>Book Associated</Th>
                <Th isNumeric>Event Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {analyticsData.map((analyticsItem, i) => (
                <Tr key={analyticsItem.action + i}>
                  <Td>
                    {analyticsItem.status == 'SUCCESS' ? (
                      <Icon boxSize={'4vw'}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#c8e6c9"
                            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                          ></path>
                          <path
                            fill="#4caf50"
                            d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
                          ></path>
                        </svg>
                      </Icon>
                    ) : analyticsItem.status == 'FAIL' ? (
                      <WarningTwoIcon />
                    ) : (
                      <InfoIcon />
                    )}
                  </Td>
                  <Td fontSize={'lg'}>{analyticsItem.action}</Td>
                  <Td fontSize={'lg'}>{analyticsItem.status}</Td>
                  <Td fontSize={'lg'}>{analyticsItem.storedBooksBarcode}</Td>
                  <Td fontSize={'lg'} isNumeric>
                    {analyticsItem.eventAt.toLocaleString()}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
}
