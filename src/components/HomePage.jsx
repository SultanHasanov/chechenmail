import React from "react";
import { Avatar, Button, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import authStore from "../store/AuthStore";

const HomePage = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem("username") || "пользователь"; // Используем значение из MobX Store

  const handleLogout = () => {
    authStore.logout();
    navigate("/"); // После выхода редирект на главную страницу
  };

  // Контент поповера
  const popoverContent = (
    <div>
      <p>Добро пожаловать, {userName}!</p>
      <Button type="text" danger onClick={handleLogout}>
        Выйти из аккаунта
      </Button>
    </div>
  );

  return (
    <div>
      {/* Аватар в правом верхнем углу */}
      <div style={{ position: "fixed", top: 20, right: 20 }}>
        {/* Используем Popover вместо Dropdown */}
        <Popover content={popoverContent} trigger="click">
          <Avatar size={45} icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Popover>
      </div>
    </div>
  );
};

export default HomePage;
