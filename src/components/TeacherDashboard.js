import React, { useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
function TeacherDashboard() {
  const toast = useToast();
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  useEffect(() => {
    const assign = async () => {
      const toasts = await api.get("get-my-doubt", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(toasts.data);
      toasts.data &&
        toasts.data.map((singleToast) => {
          toast({
            title: toasts.doubt,
            description: "Doubt by " + singleToast.owner,
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        });
    };
    assign();
  }, []);
  return (
    <Box display="flex" padding="5">
      <Button variant="link" colorScheme="teal" p="5">
        <Link to="/profile">Profile</Link>
      </Button>
      <Button variant="link" colorScheme="teal" p="5">
        <Link to="/dashboard-teacher/view-assignment">View Assignments</Link>
      </Button>
      <Button variant="link" colorScheme="teal" padding="5">
        <Link to="/dashboard-teacher/create-assignment">
          Create Assignments
        </Link>
      </Button>
      <Button variant="link" colorScheme="teal" padding="5">
        <Link to="/dashboard-teacher/view-doubts">View Doubts</Link>
      </Button>
      <Button variant="link" colorScheme="teal" padding="5">
        <Link to="/dashboard-teacher/make-test">Make Test</Link>
      </Button>
    </Box>
  );
}

export default TeacherDashboard;
