import React, { useState } from "react";
import TeacherDashboard from "./TeacherDashboard";
import {
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
function MakeTest() {
  const toast = useToast();
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  const [email, setEmail] = useState(new Date().toISOString().slice(0, -8));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState("");
  const onRegister = async (e) => {
    e.preventDefault();
    setLoading("rue");
    try {
      const response = await api.post(
        "create-test",
        {
          name: name,
          email: email,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data === "Success") {
        setName("");
        setLoading("");
        toast({
          title: "Assignment Added",
          description: "We've added your assignment",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        setName("");
        setLoading("");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <TeacherDashboard />
      <Flex minH="75vh" width="full" align="center" justifyContent="center">
        <Box>
          <form onSubmit={(e) => onRegister(e)}>
            <FormControl isRequired>
              <FormLabel flex="1" htmlFor="name">
                Test Name
              </FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                flex="1"
                id="name"
                type="text"
              />
              <FormLabel flex="1" mt="5" htmlFor="email">
                Duration of the test in minutes
              </FormLabel>
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(email);
                }}
                flex="1"
                id="date"
                type="number"
              />
              <FormLabel flex="1" mt="5" htmlFor="email">
                Upload Test File
              </FormLabel>
              <input type="file" id="avatar" name="avatar" accept=".pdf" />

              <Button
                width="full"
                mt="4"
                mb="4"
                colorScheme="teal"
                type="submit"
                isLoading={loading}
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </>
  );
}

export default MakeTest;