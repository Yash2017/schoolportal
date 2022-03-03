import React, { Component } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  Flex,
  //FormErrorMessage,
  Box,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
export class Register extends Component {
  render() {
    return (
      <Flex minH="100vh" width="full" align="center" justifyContent="center">
        <Box>
          <Heading align="center" mb="4">
            Register
          </Heading>
          <form>
            <FormControl>
              <FormLabel flex="1" htmlFor="name">
                Name
              </FormLabel>
              <Input flex="1" id="name" type="text" />
              <FormLabel flex="1" mt="5" htmlFor="email">
                Email address
              </FormLabel>
              <Input flex="1" id="email" type="email" />
              <FormLabel mt="4" htmlFor="Password">
                Password
              </FormLabel>
              <Input id="password" type="password" />
              <Button
                width="full"
                mt="4"
                mb="4"
                colorScheme="teal"
                type="submit"
              >
                Submit
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
}

export default Register;
