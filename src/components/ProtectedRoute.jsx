import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Получаем токен из localStorage или sessionStorage
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    // Проверяем наличие токена, чтобы определить авторизацию пользователя
    if (!token) {
        // Если токена нет, перенаправляем на страницу логина
        return <Navigate to="/" replace />;
    }

    // Если токен есть, показываем защищенные компоненты
    return children;
};

export default ProtectedRoute;
