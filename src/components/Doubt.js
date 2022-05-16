import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
function Doubt() {
  const [input, setInput] = useState("");
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  const submitHandler = async () => {
    const response = await api.post(
      "raise-doubt",
      {
        doubt: input,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
  };
  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <Input
          placeholder="Enter a doubt"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          mt={4}
          mb="4"
          colorScheme="teal"
          onClick={() => submitHandler()}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default Doubt;
