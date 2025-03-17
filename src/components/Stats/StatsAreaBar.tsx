import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { AreaChart } from "@saas-ui/charts";


// TODO: USE ME FOR THE GRAPHS OF GOODNESS
export default function StatsAreaBar({
	data,
}: {
	data: Array<any> | undefined;
}) {
	return (
		<Card width={"full"}>
			<CardHeader pb="0">
				<Heading as="h4" fontWeight="medium" size="md">
					Books Added and Removed
				</Heading>
			</CardHeader>
			<CardBody>
				{data != undefined && (
					<AreaChart
						data={data}
						categories={["addedBooks", "removedBooks"]}
						height="300px"
                        colors={['purple', 'red']}
					/>
				)}
			</CardBody>
		</Card>
	);
}