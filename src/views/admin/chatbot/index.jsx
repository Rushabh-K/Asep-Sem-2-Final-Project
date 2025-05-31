import React from "react";
import { Box } from "@chakra-ui/react";
import ChatBot from "components/ChatBot";

export default function ChatbotView() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ChatBot />
    </Box>
  );
} 