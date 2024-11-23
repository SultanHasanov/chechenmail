import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const session =
    JSON.parse(localStorage.getItem("auth")) || JSON.parse(sessionStorage.getItem("auth"));
  return session?.loggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
