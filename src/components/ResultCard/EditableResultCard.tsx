import {
  Box,
  useColorModeValue,
  Text,
  Stack,
  Divider,
  HStack,
} from "@chakra-ui/react";
import CustomEditableInput from "../Inputs/CustomEditableInput";
import axios from "axios";
import CustomEditableSelect from "../Inputs/CustomEditableSelect";
import ParkedToggle from "../Shared/ParkedToggle";

function updateBookValue(barcode: string, field: string, updateData: string) {
  updateValues();

  async function updateValues() {
    await axios.patch("/api/BookAPI/Book", {
      barcode: barcode,
      field: field,
      updateData: updateData,
    });
  }
}

export default function EditableResultCard({
  title,
  barcode,
  isbn,
  author,
  genre,
  ...rest
}: IScannedBookLayout) {
  const book = { title, barcode, isbn, author, genre, ...rest };
  return (
    <Box
      p={5}
      maxW={"500px"}
      bg={useColorModeValue("gray.100", "gray.600")}
      boxShadow={"xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <Stack align={"Left"}>
        <CustomEditableInput
          fontSize="2xl"
          fontWeight={600}
          item={title || "Enter a title..."}
          onSubmit={(data) => updateBookValue(barcode, "title", data)}
        />

        <Divider borderColor={useColorModeValue("black", "white")} />
        <Stack>
          <ResultItem
            barcode={barcode}
            cardBodyName={"Author"}
            field={"author"}
            item={author}
            genre={""}
          />
          <ResultItem
            barcode={barcode}
            cardBodyName={"Genre"}
            field={"genre"}
            genre={genre}
            item={genre}
          />
          <ResultItem
            barcode={barcode}
            cardBodyName={"ISBN"}
            field={"isbn"}
            item={isbn}
            genre={""}
          />
          <HStack>
            <Text fontWeight={700}>Barcode:</Text>
            <Text fontSize={"lg"} fontWeight={600}>
              {barcode}
            </Text>
          </HStack>
          <ParkedToggle book={book} fontSize="lg" fontWeight={600} />
        </Stack>
      </Stack>
    </Box>
  );
}

function ResultItem({
  barcode,
  item,
  cardBodyName,
  field,
  genre,
}: {
  barcode: string;
  item: string;
  cardBodyName: string;
  field: "title" | "author" | "genre" | "isbn";
  genre: string;
}) {
  if (field == "genre") {
    return (
      <HStack>
        <Text fontWeight={700}>{cardBodyName}:</Text>
        <CustomEditableSelect
          fontSize="lg"
          fontWeight={600}
          item={item || `Edit ${field}...`}
          onSubmit={(data) => updateBookValue(barcode, field, data)}
          genre={genre}
        />
      </HStack>
    );
  }
  return (
    <HStack>
      <Text fontWeight={700}>{cardBodyName}:</Text>
      <CustomEditableInput
        fontSize="lg"
        fontWeight={600}
        item={item || `Edit ${field}...`}
        onSubmit={(data) => updateBookValue(barcode, field, data)}
      />
    </HStack>
  );
}
