import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  //FormErrorMessage,
  Box,
  Button,
  Heading,
  Text,
  CircularProgress,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import { v4 } from "uuid";

const api = axios.create({
  baseURL: "http://localhost:4000/",
});

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailValidity, setEmailValidity] = useState("");
  const onRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("register", {
        name: name,
        password: password,
        email: email,
        role: "student",
      });
      if (response.data.msg === "Error") {
        console.log(response.data);
        setEmailValidity("true");
        setLoading(false);
        setEmail("");
        setName("");
        setPassword("");
      } else {
        setLoading(false);
        setEmail("");
        setName("");
        setPassword("");
        navigate("../email-verification");

        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Flex minH="100vh" width="full" align="center" justifyContent="center">
      <Box>
        <Heading align="center" mb="4">
          Register
        </Heading>
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
            <Button width="full" mt="4" mb="4" colorScheme="teal" type="submit">
              {loading ? (
                <CircularProgress isIndeterminate size="7" color="teal" />
              ) : (
                "Submit"
              )}
            </Button>
          </FormControl>
        </form>
        <Text>
          Old user? Login
          <Button variant="link" colorScheme="teal">
            <Link to="/">here </Link>
          </Button>
        </Text>
      </Box>
    </Flex>
  );
}
