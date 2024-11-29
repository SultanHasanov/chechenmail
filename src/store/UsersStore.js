import { makeAutoObservable } from "mobx";
import axios from "axios";

class UsersStore {
  users = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.get("https://90.156.156.78:8080/users_list");
      this.users = response.data; // Сохраняем данные о пользователях
    } catch (err) {
      this.error = err.response?.data?.message || "Ошибка при загрузке пользователей";
    } finally {
      this.isLoading = false;
    }
  }
}

const usersStore = new UsersStore();
export default usersStore;
