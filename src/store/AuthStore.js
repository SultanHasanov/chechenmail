import { makeAutoObservable } from "mobx";
import axios from "axios";

class AuthStore {
  token = localStorage.getItem("authToken") || null; // Загрузка токена из localStorage при инициализации
  username = "";
  role = "";
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Метод для входа
  async login(credentials) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.post(
        "https://90.156.156.78:8080/auth/login",
        credentials
      );
      const { token, username, role, ID } = response.data;

      this.token = token;
      this.username = username;
      this.role = role;
console.log(token)
      // Сохраняем токен в localStorage
      localStorage.setItem("authToken", token);
    } catch (err) {
      this.error = err.response?.data?.message || "Ошибка авторизации";
    } finally {
      this.isLoading = false;
    }
  }

  // Метод для выхода
  logout() {
    this.token = null;
    this.username = "";
    this.role = "";
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
  }

  // Дополнительный метод для проверки авторизации (можно использовать, чтобы загружать данные пользователя)
  isAuthenticated() {
    return !!this.token;
  }
}

// Экземпляр хранилища
const authStore = new AuthStore();
export default authStore;
