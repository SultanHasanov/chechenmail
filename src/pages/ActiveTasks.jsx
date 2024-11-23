import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import '../App.css'
import { Button } from "antd";
const ActiveTasks = ({tasks, setTasks}) => {
  // const [tasks, setTasks] = useState([]);
  

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
      <h1>Создать задачу</h1>
      <Button onClick={() => setActive(!active)}>Создать задачу</Button>
      <div>
        {active && <TaskForm onAddTask={addTask} /> }
      
      </div>
      <div>
      <h2 style={{ marginTop: 32 }}>Активные задачи</h2> 
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
</div>
    </div>
  );
};

export default ActiveTasks;
