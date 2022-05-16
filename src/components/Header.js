import React, { useEffect, useState } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
function Header() {
  return (
    <header>
      <Box display="flex" padding="5">
        <Button
          leftIcon={<FaUserCircle />}
          variant="link"
          colorScheme="teal"
          p="5"
        >
          <Link to="/profile">Profile</Link>
        </Button>
        <Button variant="link" colorScheme="teal" p="5">
          <Link to="/classes">Classes</Link>
        </Button>
        <Button variant="link" colorScheme="teal" padding="5">
          <Link to="/assignments">Assignments</Link>
        </Button>
        <Button variant="link" colorScheme="teal" padding="5">
          <Link to="/raise-doubt">Doubt</Link>
        </Button>
        <Button variant="link" colorScheme="teal" padding="5">
          <Link to="/submit-test">Tests</Link>
        </Button>
      </Box>
    </header>
  );
}

export default Header;
