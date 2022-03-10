import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Text, Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";
export function Profile() {
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const user = await api.get("user-info", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(user.data);
      setUserData(user.data);
    };
    fetchData();
    return () => setUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <Header />
      {userData && (
        <Box pl="35">
          <Text fontSize="lg">
            Name: <Text as="em">{userData[0].name}</Text>
            <br />
            Email: <Text as="em">{userData[0].email}</Text>
            <br />
            Role: <Text as="em">{userData[0].role}</Text>
          </Text>
          <Button mt={4} mb="4" colorScheme="teal" onClick={logout}>
            Logout
          </Button>
        </Box>
      )}
    </div>
  );
}

export default Profile;
