import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
function Admin() {
  const navigate = useNavigate();
  return (
    <Box display="flex" padding="5">
      <Button variant="link" colorScheme="teal" p="5">
        <Link to="/admin/create-teacher">Create New Teacher</Link>
      </Button>
      <Button variant="link" colorScheme="teal" p="5">
        <Link to="/admin/manage-account">Manage Accounts</Link>
      </Button>
      <Button
        variant="link"
        colorScheme="teal"
        p="5"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Log Out
      </Button>
    </Box>
  );
}

export default Admin;
