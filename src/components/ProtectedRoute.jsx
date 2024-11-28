import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Получаем токен из localStorage или sessionStorage
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  // Если токен есть, значит, пользователь авторизован
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
