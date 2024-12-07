import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Хук для управления формой
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [isHome, setIsHome] = useState(false); // Состояние для Switch
  // Обработчик отправки формы
  const handleLogin = async (values) => {
    const { username, password } = values;

    setIsLoading(true); // Включаем индикатор загрузки

    try {
      // Выполняем запрос на сервер для авторизации
      const response = await axios.post(
        "https://90.156.156.78:8080/auth/login",
        {
          username,
          password,
        }
      );
// console.log(response.data)
      const { token } = response.data;

      // Сохраняем токен и роль в localStorage (или в MobX, Redux и т.д. для дальнейшего использования)
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);

      message.success("Авторизация успешна!");

      // Перенаправление на другую страницу (например, на главную страницу)
      navigate("/home"); // Замените на свой путь после успешной авторизации
    } catch (error) {
      message.error("Ошибка авторизации. Пожалуйста, проверьте данные.");
    } finally {
      setIsLoading(false); // Отключаем индикатор загрузки
    }
  };

  // Toggle-переключатель

  const handleSwitchChange = (checked) => {
    setIsHome(checked);
    navigate(checked ? "/home" : "/"); // Переключаем между маршрутами
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto" }}>
      <h1>Авторизация</h1>
      <Form
        layout="vertical"
        form={form} // Привязываем форму к Ant Design
        onFinish={handleLogin}
        initialValues={{
          remember: rememberMe,
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Пожалуйста, введите логин!" }]}
        >
          <Input
            style={{ height: "40px", fontSize: "17px" }}
            placeholder="Введите логин"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
        >
          <Input.Password
            style={{ height: "40px", fontSize: "17px" }}
            placeholder="Введите пароль"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
            Запомнить меня
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            style={{ padding: "20px", fontSize: "22px" }}
            type="primary"
            htmlType="submit"
            block
            loading={isLoading} // Показываем индикатор загрузки
          >
            Войти
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "16px" }}>
              {isHome ? "На /home" : "На /"}
            </span>
            <Switch
              checked={isHome}
              onChange={handleSwitchChange} // Обработчик Switch
              style={{ marginLeft: "10px" }}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
