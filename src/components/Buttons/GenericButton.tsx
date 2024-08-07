import { Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Buttons = {
  Add: {
    buttonLoadingText: "Adding Book...",
    buttonBgColor: "bg-green-400",
    buttonHoverColor: "green.600",
    buttonText: "Add",
  },
  Activate: {
    buttonLoadingText: "Adding Book...",
    buttonBgColor: "bg-green-400",
    buttonHoverColor: "green.600",
    buttonText: "Activate",
  },
  Remove: {
    buttonLoadingText: "Removing Book...",
    buttonBgColor: "bg-red-300",
    buttonHoverColor: "red.300",
    buttonText: "Remove",
  },
};

export default function GenericButton({
  isLoading,
  buttonType,
}: {
  isLoading: boolean;
  buttonType: "Add" | "Remove" | "Activate";
}) {
  const { buttonLoadingText, buttonBgColor, buttonHoverColor, buttonText } =
    Buttons[buttonType];
  return (
    <Button
      isLoading={isLoading}
      loadingText={buttonLoadingText}
      className={buttonBgColor}
      color={"white"}
      _hover={{
        bgColor: buttonHoverColor,
        color: useColorModeValue("gray.300", "gray.300"),
      }}
      w={"100%"}
      size="lg"
      px={10}
      mt={2}
      type="submit"
    >
      {buttonText}
    </Button>
  );
}
