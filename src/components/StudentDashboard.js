import React, { useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
function StudentDashboard() {
  const toast = useToast();
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  useEffect(() => {
    const assign = async () => {
      const toasts = await api.get("get-my-assignment", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      toasts.data &&
        toasts.data.map((singleToast) => {
          toast({
            title: singleToast.name,
            description:
              "Due on " + singleToast.due.replace(/-/g, "/").replace("T", " "),
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        });
    };
    assign();
  }, []);
  return (
    <>
      <Header />
    </>
  );
}

export default StudentDashboard;
