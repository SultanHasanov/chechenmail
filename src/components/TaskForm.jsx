import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Upload, Checkbox, Button, Select, message, Flex } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import usersStore from "../store/UsersStore";
import { toJS } from "mobx";

const { TextArea } = Input;

const TaskForm = ({ onAddTask }) => {
  const [form] = Form.useForm();
  const [sendToAll, setSendToAll] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUsersData = async () => {
      await usersStore.fetchUsers();
      setLoading(false);
    };

    fetchUsersData();
  }, []);

  const users = toJS(usersStore.users);

  // console.log("Данные о пользователях из MobX:", users);
  const handleFinish = (values) => {
    const task = {
      ...values,
      id: Date.now(),
      dueDate: values.dueDate.format("YYYY-MM-DD"),
    };
    onAddTask(task);
    form.resetFields();
    message.success("Задача успешно добавлена!");
  };


  const handleSchoolChange = (selectedSchoolIds) => {
    // Извлекаем все школы
    const allSchools = toJS(usersStore.users); 

    // Находим имена школ по выбранным ID
    const selectedSchoolNames = allSchools
      .filter((school) => selectedSchoolIds.includes(school.id)) // Фильтруем школы по ID
      .map((school) => school.username); // Извлекаем имя школы

    console.log("Выбранные школы:", selectedSchoolNames); // Выводим имена выбранных школ
  };

  const handleSchoolChekbox = (e) => {
    const allSchools = toJS(usersStore.users); 
    const isChecked = e.target.checked;
    setSendToAll(isChecked); // Изменяем состояние чекбокса
    if (isChecked) {
      const schoolNames = allSchools
      console.log("Чекбокс включен.", schoolNames);
    } else {
      const schoolNames = null
      console.log("Чекбокс выключен." , schoolNames);
    }

  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <Form.Item
        label="Тема задачи"
        name="title"
        rules={[{ required: true, message: "Пожалуйста, укажите тему задачи!" }]}
      >
        <Input placeholder="Введите тему" />
      </Form.Item>

      <Form.Item
        label="Описание задачи"
        name="description"
        rules={[
          { required: true, message: "Пожалуйста, добавьте описание задачи!" },
          { max: 500, message: "Описание не должно превышать 500 символов!" },
        ]}
      >
        <Flex vertical gap={32}>
    
    
    <TextArea
      showCount
      maxLength={500}
      
      placeholder="Введите не больше 500 символов"
      style={{
        height: 120,
        resize: 'none',
      }}
    />
  </Flex>
      </Form.Item>

      <Form.Item
        label="Срок исполнения"
        name="dueDate"
        rules={[{ required: true, message: "Пожалуйста, выберите срок исполнения!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      {/* <Form.Item label="Добавить файл" name="file">
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />}>Загрузить файл</Button>
        </Upload>
      </Form.Item> */}

      <Form.Item name="schools" label="Школы">
      <div>
        <Checkbox
          checked={sendToAll}
          onChange={handleSchoolChekbox}
          style={{ marginBottom: 8 }}
        >
          Отправить всем школам
        </Checkbox>
        {!sendToAll && (
          <Select
            mode="multiple"
            placeholder="Выберите школы"
            options={users.map((user) => ({
              label: user.username, // предполагаем, что у каждого объекта есть поле "name"
              value: user.id, // предполагаем, что у каждого объекта есть поле "id"
            }))}
            onChange={handleSchoolChange} // Добавляем обработчик изменения
            loading={loading} // Показываем индикатор загрузки
          />
        )}
        </div>
      </Form.Item>

      <Form.Item
        label="Приоритет задачи"
        name="priority"
        rules={[{ required: true, message: "Пожалуйста, выберите приоритет!" }]}
      >
        <Select
          options={[
            { label: "Для сведения", value: "info" },
            { label: "Для исполнения", value: "action" },
          ]}
          placeholder="Выберите приоритет"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Отправить задачу
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
