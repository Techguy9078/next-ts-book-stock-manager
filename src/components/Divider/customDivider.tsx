import { Divider, useColorModeValue } from "@chakra-ui/react";

export default function CustomDivider() {
  return (
    <Divider
      w={"100%"}
      my={1}
      borderColor={useColorModeValue("rgba(0,0,0,0.3)", "white")}
    />
  );
}
