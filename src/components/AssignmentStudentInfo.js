import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
function AssignmentInfo({ name, dueDate, submitAssignment }) {
  return (
    <Flex ml="8" mr="8" mb="8">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        bg=""
        p="10"
        fontSize="lg"
        minW="full"
        alignSelf="center"
      >
        <Text mt="4">Name: {name}</Text>
        <Text mt="4">Due: {dueDate}</Text>
        <Button
          mt="4"
          leftIcon={<FaEdit />}
          onClick={() => submitAssignment(dueDate)}
        >
          {" "}
          Submit Assignment{" "}
        </Button>
      </Box>
    </Flex>
  );
}

export default AssignmentInfo;
