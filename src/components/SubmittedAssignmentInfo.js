import React, { useState } from "react";
import { Box, Text, Button, Flex, Input } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
function SubmitAssignmentInfo({
  name,
  dueDate,
  download,
  fileName,
  remark,
  startingvalue,
}) {
  const [text, setText] = useState(startingvalue);
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
        <Text mt="4">Assigment Name: {name}</Text>
        <Text mt="4">Student Email: {dueDate}</Text>
        <Input
          mt="4"
          bg="white"
          placeholder="Remark"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button mt="4" onClick={() => download(fileName)}>
          {" "}
          Download Assignment{" "}
        </Button>
        <Button mt="4" ml="4" onClick={() => remark(text, name)}>
          {" "}
          Submit Remark{" "}
        </Button>
      </Box>
    </Flex>
  );
}

export default SubmitAssignmentInfo;
