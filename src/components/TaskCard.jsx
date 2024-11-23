import React from "react";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {

  console.log(task.title + '    Данные')
  return (
    <Card title={task.title} extra={<Tag color={task.priority === "action" ? "red" : "blue"}>{task.priority === "action" ? "Для исполнения" : "Для сведения"}</Tag>} style={{ marginBottom: 16 }}>
      <p>Срок исполнения: {task.dueDate}</p>
      <Link to={`/tasks/${task.id}`}>Подробнее</Link>
    </Card>
  );
};

export default TaskCard;
