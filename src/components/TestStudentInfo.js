import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { saveAs } from "file-saver";
function TestStudentInfo({ name, dueDate, submitAssignment }) {
  const saveFile = () => {
    saveAs(
      "http://localhost:8000/Assignment%201%20CSET%204350.pdf",
      "pinterest"
    );
  };
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
        <Text mt="4">Due: {dueDate} mins</Text>
        <Button mt="4" mr="5" onClick={saveFile}>
          Download test
        </Button>
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

export default TestStudentInfo;
