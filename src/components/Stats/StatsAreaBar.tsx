import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import { SalesStats } from '@prisma/client';
import { AreaChart } from '@saas-ui/charts';

export default function StatsAreaBar({
  data,
}: {
  data: Array<SalesStats>;
}) {
	// IGNORE THIS YOU DIDNT SEE IT :)
	const newData : any = data

  return (
    <Card width={'full'}>
      <CardHeader pb="0">
        <Heading as="h4" fontWeight="medium" size="md">
          Books Added and Removed
        </Heading>
      </CardHeader>
      <CardBody>
        {data != undefined && (
          <AreaChart
            data={newData}
            categories={['addedBooks', 'activateBooks', 'removedBooks']}
            height="300px"
            colors={['purple', 'red']}
          />
        )}
      </CardBody>
    </Card>
  );
}
