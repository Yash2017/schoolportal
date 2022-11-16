import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
function AssignmentInfo({
  name,
  dueDate,
  submitAssignment,
  download,
  fileName,
}) {
  return (
    <Flex ml="8" mr="8" mb="8">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        bg="teal.100"
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
          onClick={() => submitAssignment(dueDate, name)}
        >
          {" "}
          Submit Assignment{" "}
        </Button>
        <Button mt="4" ml="4" onClick={() => download(fileName)}>
          {" "}
          Download Files{" "}
        </Button>
      </Box>
    </Flex>
  );
}

export default AssignmentInfo;
