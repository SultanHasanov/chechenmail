import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { motion } from "framer-motion"; // импорт анимации
import { DragOutlined } from '@ant-design/icons'; // Иконка для перетаскивания
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import HomePage from "../components/HomePage";
import Draggable from 'react-draggable'; // Импортируем react-draggable

const { Text } = Typography;

const Home = ({ tasks, setTasks }) => {
  const userName = localStorage.getItem("username") || "пользователь";
  const [active, setActive] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <h2>Добро пожаловать, {userName}!</h2>
      <Text style={{ fontSize: "18px" }} type="success">
        Если хотите создать задачу для школ, нажмите кнопку ниже 👇
      </Text>
      <br />
      <br />
      <Button onClick={() => setActive(!active)}>Создать задачу</Button> <span>👈</span>
      <div>
        {/* Анимация карточки для создания задачи */}
        {active && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} // начальная позиция (невидимая)
            animate={{ opacity: 1, y: 0 }} // конечная позиция (видимая)
            exit={{ opacity: 0, y: 20 }} // когда компонент исчезает
            transition={{ duration: 0.5 }} // время анимации
          >
            <Draggable>
              <div
                style={{
                  width: "750px",
                  position: 'relative', // необходим для корректного позиционирования
                }}
              >
                {/* Иконка для перетаскивания */}
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    fontSize: '24px',
                    textAlign: 'center',
                    
                    position: 'absolute',
                    top: 15,
                    right: 130,
                    cursor: 'move',
                    backgroundColor: 'gray',
                    padding: '5px 10px 10px 6px',
                    borderRadius: '50%',
                  }}
                >
                  <DragOutlined style={{ color: 'white' }} />
                </div>

                {/* Передаем иконку в TaskForm как проп */}
                <TaskForm onAddTask={addTask} dragIcon={<DragOutlined />} />
              </div>
            </Draggable>
          </motion.div>
        )}
      </div>
      <div>
        <h2 style={{ marginTop: 32 }}>Активные задачи</h2>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <HomePage />
    </div>
  );
};

export default Home;
