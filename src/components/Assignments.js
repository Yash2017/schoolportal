import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import AssignmentStudentInfo from "./AssignmentStudentInfo";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  useDisclosure,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
export default function Assignments() {
  const toast = useToast();
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  useEffect(() => {
    const fetchAssignments = async () => {
      const assignment = await api.get("get-assignments", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(assignment.data);
      setAssignments(assignment.data);
    };
    fetchAssignments();
  }, []);
  const submit = (due, name) => {
    setAssign(name);
    onOpen();
  };

  const onSubmit = async () => {
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assignment", assign);
      const response = await api.post("submit-assignment", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      toast({
        title: "Assignment Submitted",
        // description: ",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
  };

  const download = async (due, name) => {
    window.open(`http://localhost:4000/download/${due}`);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignments, setAssignments] = useState();
  const [assign, setAssign] = useState();
  const [file, setFile] = useState();
  return (
    <div>
      <Header>
        <div style={{ marginTop: "10px" }}>
          {assignments &&
            assignments.map((assignment, i) => {
              return (
                <AssignmentStudentInfo
                  key={i}
                  name={assignment.name}
                  dueDate={assignment.due}
                  submitAssignment={submit}
                  fileName={assignment.path}
                  download={download}
                />
              );
            })}
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Submit Assignment</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            {/* <FormLabel flex="1" mt="5" htmlFor="email">
            Upload Test File
          </FormLabel> */}
            <input
              style={{ marginLeft: "20px" }}
              type="file"
              id="avatar"
              name="avatar"
              accept=".docx"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={onSubmit}>
                Submit
              </Button>
              <Button colorScheme="teal" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Header>
    </div>
  );
}
