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
  useToast,
  Select,
  Image,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import { v4 } from "uuid";

const api = axios.create({
  baseURL: "http://localhost:4000/",
});

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailValidity, setEmailValidity] = useState("");
  const [subject, setSubject] = useState("");
  const onRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      formData.append(
        "public_id",
        "imageName" + "_" + Math.round(Date.now() / 1000)
      );
      const uploadData = await fetch(
        "https://api.cloudinary.com/v1_1/dunl9faht/image/upload",
        { method: "POST", body: formData }
      ).then((r) => r.json());

      console.log(uploadData.secure_url);

      const response = await api.post("register", {
        name: name,
        password: password,
        email: email,
        role: "student",
        class: subject,
        profilePic: uploadData.secure_url,
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
    <Flex
      minH="100vh"
      width="full"
      align="center"
      justifyContent="space-between"
    >
      <Box
        // boxSize="sm"
        // style={{ marginRight: "40%" }}
        width="50%"
        height={"100vh"}
        bg="teal"
      >
        <Flex
          align={"center"}
          height="100%"
          justifyContent="center"
          alignItems={"center"}
          flexDirection="column"
        >
          <Image
            src="https://i.postimg.cc/G37dVFKQ/stepahead.jpg"
            width={"400px"}
            height={"400px"}
            borderRadius="2xl"
            mb="15px"
          />
          <Text color={"white"} fontSize="lg">
            This is in collaboration with Shah & Anchor Kutchhi Engineering
            College
          </Text>
        </Flex>
      </Box>
      <Box mr="10%" width={"400px"}>
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
            <FormLabel mt="4">Select a Subject</FormLabel>
            <Select
              onChange={(e) => {
                console.log(e.target.value);
                setSubject(e.target.value);
              }}
              placeholder="Select Class"
              size={"md"}
              width="full"
            >
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </Select>
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
            <FormLabel mt="4" htmlFor="Password">
              Profile Picture
            </FormLabel>
            <input
              style={{}}
              type="file"
              // id="avatar"
              // style={{ width: "100px" }}
              // name="avatar"
              accept=".jpg"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileName(e.target.files[0].name);
              }}
            />
            {fileName ? <Text>{fileName}</Text> : null}
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
