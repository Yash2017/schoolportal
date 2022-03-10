import React, { useState } from "react";
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
  CircularProgress,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailValidity, setEmailValidity] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  const loginForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("login", {
        password: password,
        email: email,
        role: sliderValue ? "teacher" : "student",
      });
      if (response.data.msg === "Error") {
        setLoading(false);
        setEmail("");
        setPassword("");
        setEmailValidity("true");
      } else {
        localStorage.setItem("token", response.data.token);
        setLoading(false);
        setEmail("");
        setPassword("");
        if (email === "admin@admin.com") navigate("admin");
        else if (sliderValue === 1) {
          navigate("dashboard-teacher");
        } else navigate("dashboard-student");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Flex minH="100vh" width="full" align="center" justifyContent="center">
      <Box>
        <Heading align="center" mb="4">
          Login
        </Heading>
        <form onSubmit={(e) => loginForm(e)}>
          <FormControl isRequired>
            <FormLabel flex="1" htmlFor="email">
              Email address
            </FormLabel>
            <Input
              value={email}
              isInvalid={emailValidity}
              placeholder={emailValidity ? "Invalid Email" : ""}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailValidity("")}
              flex="1"
              id="email"
              type="email"
            />
            <FormLabel mt="4" htmlFor="Password">
              Password
            </FormLabel>
            <Input
              value={password}
              isInvalid={emailValidity}
              placeholder={emailValidity ? "Invalid Password" : ""}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
            />
            <Button width="full" mt={4} mb="4" colorScheme="teal" type="submit">
              {loading ? (
                <CircularProgress size="7" isIndeterminate color="teal" />
              ) : (
                "Submit"
              )}
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
          <Slider
            onChange={(val) => setSliderValue(val)}
            flex="1"
            defaultValue={0}
            min={0}
            max={1}
            step={1}
            value={sliderValue}
          >
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
