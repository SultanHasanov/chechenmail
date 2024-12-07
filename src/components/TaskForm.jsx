import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Checkbox,
  Button,
  Select,
  message,
} from "antd";
import usersStore from "../store/UsersStore";
import { taskStore } from "../store/TasksStore"; // Импорт TaskStore
import { toJS } from "mobx";
import { observer } from "mobx-react-lite"; // Для наблюдения за MobX состоянием
import { motion } from "framer-motion";
import "../App.css";

const { TextArea } = Input;

const TaskForm = observer(() => {
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

  const handleFinish = async (values) => {
    try {
      // Обновляем поля задачи в TaskStore
      taskStore.updateTaskField("title", values.title);
      taskStore.updateTaskField("description", values.description);
      taskStore.updateTaskField("due_date", values.dueDate.format("YYYY-MM-DD"));
      taskStore.updateTaskField(
        "user_ids",
        sendToAll ? users.map((user) => user.id) : values.schools || []
      );
      taskStore.updateTaskField("priority", values.priority);

      // Отправляем запрос через TaskStore
      await taskStore.createTask();

      message.success("Задача успешно создана!");
      form.resetFields();
      setSendToAll(false); // Сбрасываем состояние чекбокса
    } catch (error) {
      message.error("Не удалось создать задачу. Попробуйте снова.");
    }
  };

  const handleSchoolChange = (selectedSchoolIds) => {
    const selectedSchoolNames = users
      .filter((school) => selectedSchoolIds.includes(school.id))
      .map((school) => school.username);
    console.log("Выбранные школы:", selectedSchoolNames);
  };

  const handleSchoolCheckbox = (e) => {
    setSendToAll(e.target.checked);
    console.log(e.target.checked ? "Чекбокс включен" : "Чекбокс выключен");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="task-form-card"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="task-form"
      >
        <h3 style={{ textAlign: "center", marginBottom: 10, marginTop: 0 }}>
          Создание задачи
        </h3>
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
            {
              required: true,
              message: "Пожалуйста, добавьте описание задачи!",
            },
            { max: 500, message: "Описание не должно превышать 500 символов!" },
          ]}
        >
          <TextArea
            showCount
            maxLength={500}
            placeholder="Введите не больше 500 символов"
            style={{
              height: 120,
              resize: "none",
            }}
          />
        </Form.Item>

        <div className="block">
          <div className="block_1">
            <Form.Item
              label="Срок исполнения"
              name="dueDate"
              rules={[{ required: true, message: "Пожалуйста, выберите срок!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="schools" label="Школы">
              <div>
                <Checkbox
                  checked={sendToAll}
                  onChange={handleSchoolCheckbox}
                  style={{ marginBottom: 8 }}
                >
                  Отправить всем школам
                </Checkbox>
                {!sendToAll && (
                  <Select
                    mode="multiple"
                    placeholder="Выберите школы"
                    options={users.map((user) => ({
                      label: user.username,
                      value: user.id,
                    }))}
                    onChange={handleSchoolChange}
                    loading={loading}
                  />
                )}
              </div>
            </Form.Item>
          </div>
          <div className="block_2">
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
              <Button className="btn-form" type="primary" htmlType="submit" block>
                Отправить задачу
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </motion.div>
  );
});

export default TaskForm;
