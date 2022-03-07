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
import EmailVerification from "./components/EmailVerification";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="classes" element={<Classes />} />
          <Route path="profile" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard-student" element={<Header />} />
          <Route
            path="register/email-verification"
            element={<EmailVerification />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
