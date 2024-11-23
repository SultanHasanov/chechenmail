import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Menu, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Получение данных из localStorage
    const userData = localStorage.getItem("auth");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    message.success("Вы вышли из аккаунта");
    navigate("/");
  };

  // Меню для Dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1" disabled>
        <span>Добро пожаловать, {user?.fullName || "пользователь"}!</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Button type="text" danger onClick={handleLogout}>
          Выйти из аккаунта
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {/* Аватар в правом верхнем углу */}
      <div style={{ position: "fixed", top: 20, right: 20 }}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Avatar size={45} icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Dropdown>
      </div>
    </div>
  );
};

export default HomePage;
