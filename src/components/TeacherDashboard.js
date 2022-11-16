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
import { FiStar, FiUser, FiSave, FiCheck, FiCpu } from "react-icons/fi";
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
    { name: "Profile", icon: FiUser, link: "/dashboard-teacher/profile" },
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
    {
      name: "View Doubt",
      icon: FiStar,
      link: "/dashboard-teacher/view-doubts",
    },
    {
      name: "Check Assignment",
      icon: FiCheck,
      link: "/dashboard-teacher/submitted-assignment",
    },
    // { name: "Make Test", icon: FiCpu, link: "make-test" },
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
  return userData !== undefined ? (
    <Box minH="100vh" bg="gray.100">
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
                // "https://res.cloudinary.com/dunl9faht/image/upload/v1668624530/imageName_1668624512.png"
                // }
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

export default TeacherDashboard;
