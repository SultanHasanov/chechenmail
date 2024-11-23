import React, { useState } from "react";
import { Form, Input, DatePicker, Upload, Checkbox, Button, Select, message, Flex } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const TaskForm = ({ onAddTask }) => {
  const [form] = Form.useForm();
  const [sendToAll, setSendToAll] = useState(false);

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

      <Form.Item label="Добавить файл" name="file">
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />}>Загрузить файл</Button>
        </Upload>
      </Form.Item>

      <Form.Item name="schools" label="Школы">
        <Checkbox
          checked={sendToAll}
          onChange={(e) => setSendToAll(e.target.checked)}
          style={{ marginBottom: 8 }}
        >
          Отправить всем школам
        </Checkbox>
        {!sendToAll && (
          <Select
            mode="multiple"
            placeholder="Выберите школы"
            options={[
              { label: "Школа 1", value: "school1" },
              { label: "Школа 2", value: "school2" },
              { label: "Школа 3", value: "school3" },
            ]}
          />
        )}
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
