import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
function DoubtInfo({ name, owner }) {
  return (
    <Flex ml="8" mr="8" mb="8">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        bg="teal.900"
        p="10"
        fontSize="lg"
        minW="full"
        alignSelf="center"
      >
        <Text mt="4">Doubt: {name}</Text>
        <Text mt="4">By: {owner}</Text>
      </Box>
    </Flex>
  );
}

export default DoubtInfo;
