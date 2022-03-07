import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  FormControl,
  Heading,
  FormLabel,
  Input,
  Button,
  CircularProgress,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function EmailVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpValidity, setOtpValidity] = useState("");
  const [loading, setLoading] = useState(false);
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  const emailForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("email-verification", {
        otp: otp,
      });
      if (response.data.length) {
        setLoading(false);
        setOtp("");
        navigate("/");
      } else {
        setOtpValidity("true");
        setLoading(false);
        setOtp("");
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
        <form onSubmit={(e) => emailForm(e)}>
          <FormControl isRequired>
            <FormLabel flex="1" htmlFor="otp">
              Otp
            </FormLabel>
            <Input
              value={otp}
              isInvalid={otpValidity}
              placeholder={otpValidity ? "Invalid Otp" : ""}
              onChange={(e) => setOtp(e.target.value)}
              //onFocus={() => setEmailValidity("")}
              flex="1"
              id="email"
              type="text"
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
        <Text mt="4">Please enter the otp that is sent to your email</Text>
      </Box>
    </Flex>
  );
}

export default EmailVerification;
