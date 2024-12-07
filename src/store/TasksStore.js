import { makeAutoObservable } from "mobx";
import axios from "axios";

class TaskStore {
    task = {
        created_by: 0,
        description: "",
        due_date: "",
        file_path: "",
        id: 0,
        priority: "",
        title: "",
        user_ids: [],
    };

    constructor() {
        makeAutoObservable(this);
    }

    // Метод для обновления данных задачи
    updateTaskField(field, value) {
        this.task[field] = value;
    }

    // Метод для отправки запроса на создание задачи
    async createTask() {
        try {
            const token = localStorage.getItem("authToken") || null; // Используйте безопасное хранилище для токена
            const response = await axios.post(
                "https://90.156.156.78:8080/admin/tasks/create",
                this.task,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Задача успешно создана:", response.data);
            return response.data;
        } catch (error) {
            console.error("Ошибка при создании задачи:", error);
            throw error;
        }
    }
}

export const taskStore = new TaskStore();
