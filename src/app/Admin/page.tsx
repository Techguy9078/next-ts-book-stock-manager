"use client";
import { Box, Button, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

export default function Admin() {
  const [exported, setExported] = useState<boolean>(false);
  return (
    <Box
      p={4}
      bgColor={useColorModeValue("gray.200", "gray.700")}
      rounded={"md"}
    >
      <VStack spacing={4} align={"left"} pb={4}>
        <Text fontSize="2xl">Admin Functions</Text>
        {exported && <Text>Exported Database!</Text>}
        <Button
          variant={"solid"}
          color={"black"}
          onClick={() => {
            setExported(false);
            import("@/utils/pgDump").then((module: any) =>
              module.default().then(() => {
                setExported(true);
              })
            );
          }}
        >
          Export Database
        </Button>
      </VStack>
    </Box>
  );
}
