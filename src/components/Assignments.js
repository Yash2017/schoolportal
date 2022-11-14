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
} from "@chakra-ui/react";
export default function Assignments() {
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
  const submit = (due) => {
    onOpen();
  };

  const onSubmit = async () => {
    if (file) {
      const response = await api.post(
        "submit-assignment",
        {
          file: file,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignments, setAssignments] = useState();
  const [file, setFile] = useState();
  return (
    <div>
      <Header>
        {assignments &&
          assignments.map((assignment, i) => {
            return (
              <AssignmentStudentInfo
                key={i}
                name={assignment.name}
                dueDate={assignment.due}
                submitAssignment={submit}
              />
            );
          })}

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
