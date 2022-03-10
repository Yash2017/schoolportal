import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
function UserInfo({ name, email, role, delFunc }) {
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
        <Text mt="4">Email: {email}</Text>
        <Text mt="4">Role: {role}</Text>
        <Button mt="4" leftIcon={<FaTrash />} onClick={() => delFunc(email)}>
          {" "}
          Remove User{" "}
        </Button>
      </Box>
    </Flex>
  );
}

export default UserInfo;
