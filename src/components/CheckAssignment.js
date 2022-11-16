import React, { useEffect, useState } from "react";
import TeacherDashboard from "./TeacherDashboard";
import axios from "axios";
import SubmitAssignmentInfo from "./SubmittedAssignmentInfo";
import { useToast } from "@chakra-ui/react";
function CheckAssignment() {
  const toast = useToast();
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  useEffect(() => {
    const fetchAssignments = async () => {
      const assignment = await api.get("get-submitted-assignment", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(assignment.data);
      setAssignments(assignment.data);
    };
    fetchAssignments();
  }, []);

  const [assignments, setAssignments] = useState();

  const download = async (due, name) => {
    // const user = await api.get("download", {
    //   data: {
    //     name,
    //   },
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    // });
    window.open(`http://localhost:4000/download/${due}`);
    // console.log(user);
  };

  const remar = async (r, em) => {
    console.log(r);
    await api.post("add-remarks", {
      data: {
        remark: r,
        email: em,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast({
      title: "Remark Added",
      description: "We've added your remark",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <>
      <TeacherDashboard>
        <div style={{ marginTop: "10px" }}>
          {assignments &&
            assignments.map((assignment, i) => {
              return (
                <SubmitAssignmentInfo
                  key={i}
                  name={assignment.email}
                  dueDate={assignment.assignName}
                  download={download}
                  fileName={assignment.path}
                  remark={remar}
                  startingvalue={assignment.remarks}
                />
              );
            })}
        </div>
      </TeacherDashboard>
    </>
  );
}

export default CheckAssignment;
