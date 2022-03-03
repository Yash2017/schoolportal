import React, { Component } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  Flex,
  //FormErrorMessage,
  Box,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
export class Login extends Component {
  render() {
    return (
      <Flex minH="100vh" width="full" align="center" justifyContent="center">
        <Box>
          <Heading align="center" mb="4">
            Login
          </Heading>
          <form>
            <FormControl>
              <FormLabel flex="1" htmlFor="email">
                Email address
              </FormLabel>
              <Input flex="1" id="email" type="email" />
              <FormLabel mt="4" htmlFor="Password">
                Password
              </FormLabel>
              <Input id="password" type="password" />
              <Button
                width="full"
                mt={4}
                mb="4"
                colorScheme="teal"
                type="submit"
              >
                Submit
              </Button>
            </FormControl>
          </form>
          <Text>
            Not a user? Register
            <Button variant="link" colorScheme="teal">
              <Link to="/register">here </Link>
            </Button>
          </Text>
          <Flex mt="4" align="center">
            <Text align="left" flex="1">
              Student
            </Text>
            <Slider flex="1" defaultValue={0} min={0} max={1} step={1}>
              <SliderTrack bg="teal">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg="teal" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
            <Text align="right" flex="1">
              Teacher
            </Text>
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default Login;
