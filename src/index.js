import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Assignments from "./components/Assignments";
import Classes from "./components/Classes";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Header from "./components/Header";
import Admin from "./components/Admin";
import EmailVerification from "./components/EmailVerification";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTeacher from "./components/CreateTeacher";
import ManageAccount from "./components/ManageAccount";
import TeacherDashboard from "./components/TeacherDashboard";
import CreateAssignment from "./components/CreateAssignment";
import ViewAssignment from "./components/ViewAssignment";
import StudentDashboard from "./components/StudentDashboard";
import Doubt from "./components/Doubt";
import theme from "./theme";
import ViewDoubt from "./components/ViewDoubt";
import MakeTest from "./components/MakeTest";
import ViewTest from "./components/ViewTest";
import CheckAssignment from "./components/CheckAssignment";
import TeacherProfile from "./components/TeacherProfile";
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route element={<ProtectedRoute />}>
            <Route path="assignments" element={<Assignments />} />
            <Route path="classes" element={<Classes />} />
            <Route path="profile" element={<Profile />} />
            <Route path="submit-test" element={<ViewTest />} />
            <Route path="dashboard-student" element={<StudentDashboard />} />
            <Route path="dashboard-teacher" element={<TeacherDashboard />} />
            <Route
              path="dashboard-teacher/create-assignment"
              element={<CreateAssignment />}
            />
            <Route
              path="dashboard-teacher/view-assignment"
              element={<ViewAssignment />}
            />
            <Route
              path="dashboard-teacher/submitted-assignment"
              element={<CheckAssignment />}
            />
            <Route
              path="dashboard-teacher/profile"
              element={<TeacherProfile />}
            />
            <Route
              path="dashboard-teacher/view-doubts"
              element={<ViewDoubt />}
            />
            <Route path="dashboard-teacher/make-test" element={<MakeTest />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/create-teacher" element={<CreateTeacher />} />
            <Route path="admin/manage-account" element={<ManageAccount />} />
          </Route>
          <Route path="email-verification" element={<EmailVerification />} />
          <Route path="register" element={<Register />} />
          <Route path="raise-doubt" element={<Doubt />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
