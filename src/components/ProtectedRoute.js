import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const useAuth = () => {
  const loggedIn = localStorage.getItem("token");
  return loggedIn ? true : false;
};
function ProtectedRoute() {
  const resp = useAuth();
  return resp ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
