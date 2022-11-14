import React, { useEffect, useState } from "react";
import TeacherDashboard from "./TeacherDashboard";
import axios from "axios";
import AssignmentInfo from "./AssignmentInfo";
import DoubtInfo from "./DoubtInfo";
function ViewDoubt() {
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  useEffect(() => {
    const fetchAssignments = async () => {
      const assignment = await api.get("get-my-doubt", {
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

  const delAssignment = async (due) => {
    const user = await api.delete("delete-assignment", {
      data: {
        due,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setAssignments((prevAssignments) => {
      const newAssignment = prevAssignments.filter(
        (prevAssignment) => prevAssignment.due !== due
      );
      return newAssignment;
    });
    console.log(user);
  };
  return (
    <>
      <TeacherDashboard>
        {assignments &&
          assignments.map((assignment, i) => {
            return (
              <DoubtInfo
                key={i}
                name={assignment.doubt}
                owner={assignment.owner}
              />
            );
          })}
      </TeacherDashboard>
    </>
  );
}

export default ViewDoubt;
