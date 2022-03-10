import React, { useState } from "react";
import Admin from "./Admin";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateTeacher() {
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [emailValidity, setEmailValidity] = useState("");
  const onRegister = async (e) => {
    e.preventDefault();
    setLoading("true");
    try {
      const response = await api.post("register", {
        name: name,
        password: password,
        email: email,
        role: "teacher",
      });
      if (response.data.msg === "Error") {
        console.log(response.data);
        setEmailValidity("true");
        setLoading("");
        setEmail("");
        setName("");
        setPassword("");
      } else {
        setLoading("");
        setEmail("");
        setName("");
        setPassword("");
        navigate("../../email-verification");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Admin />
      <Flex minH="75vh" width="full" align="center" justifyContent="center">
        <Box>
          <form onSubmit={(e) => onRegister(e)}>
            <FormControl isRequired>
              <FormLabel flex="1" htmlFor="name">
                Name
              </FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                flex="1"
                id="name"
                type="text"
              />
              <FormLabel flex="1" mt="5" htmlFor="email">
                Email address
              </FormLabel>
              <Input
                value={email}
                isInvalid={emailValidity}
                placeholder={emailValidity ? "Invalid Email" : ""}
                onFocus={() => setEmailValidity("")}
                onChange={(e) => setEmail(e.target.value)}
                flex="1"
                id="email"
                type="email"
              />
              <FormLabel mt="4" htmlFor="Password">
                Password
              </FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
              />
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

export default CreateTeacher;
