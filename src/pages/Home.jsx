import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import '../App.css'
import { Button, Typography } from "antd";
import HomePage from "../components/HomePage";

const { Text  } = Typography;
const Home = ({tasks, setTasks}) => {
  // const [tasks, setTasks] = useState([]);
  
  const userName = localStorage.getItem("username") || "пользователь"; // Используем значение из MobX Store

  const [active, setActive] = useState(false)

  console.log(tasks)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // Эта функция сработает при каждом изменении tasks

  const addTask = (task) => {
    setTasks([...tasks, task]); // Добавляем новую задачу
  };



  return (
    <div >
     <h2>Добро пожаловать, {userName}!</h2>
     <Text style={{fontSize: "18px"}} type="success">Если хотите создать задачу для школ, нажмите кнопку ниже 👇</Text> <br /> <br />
      
      <Button onClick={() => setActive(!active)}>Создать задачу</Button> <span>👈</span>
      <div>
        {active && <TaskForm onAddTask={addTask} /> }
      
      </div>
      <div>
      <h2 style={{ marginTop: 32 }}>Активные задачи</h2> 
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
</div>
<HomePage/>
    </div>
  );
};

export default Home;
