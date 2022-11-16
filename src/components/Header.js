import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  HStack,
  Spacer,
  Avatar,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiUser,
  FiMenu,
  FiSave,
} from "react-icons/fi";
// import { Link } from "react-router-dom";
import axios from "axios";
function Header({ children }) {
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  const [userData, setUserData] = useState();
  useEffect(() => {
    const assign = async () => {
      const toasts = await api.get("get-my-doubt", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // const user = await api.get("user-info", {
      //   headers: {
      //     Authorization: localStorage.getItem("token"),
      //   },
      // });
      const name = localStorage.getItem("name");
      const pp = localStorage.getItem("profilePic");
      setUserData({
        name: name,
        profilePic: pp,
      });
      console.log(userData);
      console.log(toasts.data);
    };
    assign();
  }, []);

  const LinkItems = [
    { name: "Profile", icon: FiUser, link: "/profile" },
    { name: "Classes", icon: FiMenu, link: "/classes" },
    { name: "Assignments", icon: FiSave, link: "/assignments" },
    { name: "Doubt", icon: FiStar, link: "/raise-doubt" },
    // { name: "Test", icon: FiStar, link: "/submit-test" },
  ];
  // return (
  //   <header>
  //     <Box display="flex" padding="5">
  //       <Button
  //         leftIcon={<FaUserCircle />}
  //         variant="link"
  //         colorScheme="teal"
  //         p="5"
  //       >
  //         <Link to="/profile">Profile</Link>
  //       </Button>
  //       <Button variant="link" colorScheme="teal" p="5">
  //         <Link to="/classes">Classes</Link>
  //       </Button>
  //       <Button variant="link" colorScheme="teal" padding="5">
  //         <Link to="/assignments">Assignments</Link>
  //       </Button>
  //       <Button variant="link" colorScheme="teal" padding="5">
  //         <Link to="/raise-doubt">Doubt</Link>
  //       </Button>
  //       <Button variant="link" colorScheme="teal" padding="5">
  //         <Link to="/submit-test">Tests</Link>
  //       </Button>
  //     </Box>
  //   </header>
  // );

  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold"></Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} link={link.link}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    );
  };

  const NavItem = ({ icon, link, children, ...rest }) => {
    return (
      <Link
        href={link}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "teal.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return userData !== undefined ? (
    <Box minH="100vh" bg={"gray.100"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Box ml={{ base: 0, md: 60 }} p="0">
        <Flex direction={"column"}>
          <Box width={"100%"} bg={"white"} height="70px" padding={"4px"}>
            <HStack
              alignItems={"center"}
              justifyContent="center"
              style={{ marginRight: "10px", marginTop: "10px" }}
            >
              <Spacer />
              <Avatar
                // size={"sm"}
                src={userData.profilePic}
              />
              <Text>{userData.name}</Text>
            </HStack>
          </Box>
          {children}
        </Flex>
      </Box>
    </Box>
  ) : null;
}

export default Header;
