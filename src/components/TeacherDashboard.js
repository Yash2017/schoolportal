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
  Avatar,
  Spacer,
} from "@chakra-ui/react";
// import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FiStar, FiUser, FiSave } from "react-icons/fi";
import axios from "axios";
function TeacherDashboard({ children }) {
  const toast = useToast();
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
      const user = await api.get("user-info", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setUserData(user.data);
      console.log(toasts.data);
      (children === null || children === undefined) &&
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
  const LinkItems = [
    { name: "Profile", icon: FiUser, link: "/profile" },
    {
      name: "Make Assignments",
      icon: FiSave,
      link: "/dashboard-teacher/create-assignment",
    },
    {
      name: "View Assignments",
      icon: FiSave,
      link: "/dashboard-teacher/view-assignment",
    },
    { name: "View Doubt", icon: FiStar, link: "view-doubts" },
    { name: "Make Test", icon: FiStar, link: "make-test" },
  ];
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
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
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
              // src={
              //   "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              // }
              />
              <Text>Yash</Text>
            </HStack>
          </Box>
          {children}
        </Flex>
      </Box>
    </Box>
  );
}

export default TeacherDashboard;
