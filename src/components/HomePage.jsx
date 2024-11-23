import React from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    message.success("Вы вышли из аккаунта");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Добро пожаловать, admin!</h1>
      <Button type="primary" onClick={handleLogout}>
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export default HomePage;
