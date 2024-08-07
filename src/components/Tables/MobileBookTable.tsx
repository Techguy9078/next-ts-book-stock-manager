import { Box, useColorModeValue } from "@chakra-ui/react";
import MobileBookTableItem from "./MobileBookTableItem";

export default function MobileBookTable({
  bookArray,
  handleRefetch,
}: {
  bookArray: Array<IScannedBookLayout>;
  handleRefetch: Function;
}) {
  return (
    <Box
      overflow={"auto"}
      fontSize={"sm"}
      height={"calc(100dvh - 250px)"}
      sx={{
        "::-webkit-scrollbar": {
          width: "4px",
        },
        "::-webkit-scrollbar-track": {
          bgColor: useColorModeValue("gray.300", "gray.600"),
          borderRadius: "100px",
        },
        "::-webkit-scrollbar-thumb": {
          bgColor: useColorModeValue("gray.400", "gray.800"),
          borderRadius: "100px",
        },
      }}
    >
      {bookArray.length > 0 &&
        bookArray.map((book) => (
          <MobileBookTableItem
            key={book.id}
            book={book}
            handleRefetch={handleRefetch}
          />
        ))}
    </Box>
  );
}
