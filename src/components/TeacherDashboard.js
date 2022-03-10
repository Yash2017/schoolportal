import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function TeacherDashboard() {
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
    </Box>
  );
}

export default TeacherDashboard;
