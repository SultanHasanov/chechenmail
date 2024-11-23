import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";

const AUTH_CREDENTIALS = { username: "admin", password: "1111" };

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Хук для управления формой
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (values) => {
    const { username, password, fullName } = values;

    if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
      const sessionData = { username, password, fullName, loggedIn: true };
      if (rememberMe) {
        localStorage.setItem("auth", JSON.stringify(sessionData));
      } else {
        sessionStorage.setItem("auth", JSON.stringify(sessionData));
      }
      message.success(`Успешный вход, ${fullName || "пользователь"}!`);
      navigate("/home");
    } else {
      message.error("Неверный логин или пароль");
    }
  };

  useEffect(() => {
    // Проверка сохраненных данных и инициализация формы
    const savedSession = localStorage.getItem("auth") || sessionStorage.getItem("auth");
    if (savedSession) {
      const session = JSON.parse(savedSession);
      if (session.loggedIn) {
        form.setFieldsValue({
          username: session.username,
          password: session.password,
          fullName: session.fullName || "", // Предзаполнение имени, если сохранено
        });
        setRememberMe(true); // Установить "Запомнить меня" в true
      }
    }
  }, [form]);

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
          name="fullName"
          rules={[{ required: true, message: "Пожалуйста, введите ваше имя!" }]}
        >
          <Input style={{ height: "40px", fontSize: "17px" }} placeholder="Введите имя" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Пожалуйста, введите логин!" }]}
        >
          <Input style={{ height: "40px", fontSize: "17px" }} placeholder="Введите логин" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
        >
          <Input.Password style={{ height: "40px", fontSize: "17px" }} placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>Запомнить меня</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button style={{ padding: "10px", fontSize: "18px" }} type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
