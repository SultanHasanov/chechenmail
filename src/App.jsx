import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
// import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home"; // Страница активных задач
import TaskDetails from "./pages/TaskDetails"; // Страница с деталями задачи

const App = () => {
  // Хранение задач
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : []; // Если задачи есть, используем их, иначе пустой массив
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // Эта функция сработает при каждом изменении tasks

 
  console.log(tasks)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home tasks={tasks} setTasks={setTasks} />
            </ProtectedRoute>
          }
        />

        {/* Новый маршрут для деталей задачи */}
        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetails tasks={tasks} />
            </ProtectedRoute>
          }
        />

        {/* Перенаправление по умолчанию */}
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
