import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../App.css'
const TaskDetails = ({ tasks }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Хук для навигации

  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return <p>Задача не найдена!</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={() => navigate(-1)}> <ArrowLeftOutlined /> Назад</Button> {/* Кнопка назад */}
      <h1>{task.title}</h1>
      <p><strong>Описание:</strong> {task.description}</p>
      <p><strong>Срок исполнения:</strong> {task.dueDate}</p>
      <p><strong>Приоритет:</strong> {task.priority === "action" ? "Для исполнения" : "Для сведения"}</p>
      <Button  onClick={() => localStorage.removeItem('tasks')}> <DeleteOutlined /> Удалить</Button>
     
    </div>
  );
};

export default TaskDetails;
