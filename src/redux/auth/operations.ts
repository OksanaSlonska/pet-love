import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Устанавливаем базовый URL твоего API
axios.defaults.baseURL = "https://petlove.b.goit.study/api";

// Утилита для добавления токена в заголовки всех будущих запросов
const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Утилита для удаления токена (пригодится для Logout)
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials: any, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", credentials);
      // После успешной регистрации бэкенд обычно присылает токен.
      // Мы сразу записываем его в настройки axios, чтобы следующие запросы были авторизованы.
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error: any) {
      // Если ошибка — передаем её в Redux, чтобы показать пользователю
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/*
 * POST @ /users/signin
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials: any, thunkAPI) => {
    try {
      const response = await axios.post("/users/signin", credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/signout");
    // Очищаем токен из axios после успешного выхода
    axios.defaults.headers.common.Authorization = "";
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      // Устанавливаем токен в заголовки axios
      axios.defaults.headers.common.Authorization = `Bearer ${persistedToken}`;
      const { data } = await axios.get("/users/current");
      return data; // Сервер вернет данные юзера
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
