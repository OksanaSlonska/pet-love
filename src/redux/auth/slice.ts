import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";

// Описываем, как выглядит наш пользователь
interface User {
  name: string | null;
  email: string | null;
}

// Описываем структуру всего Auth стейта
interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Пока оставим пустым, сюда мы позже добавим логику Logout или очистки ошибок
  },
  // Здесь будет логика для Register, Login и Refresh (чуть позже)
  extraReducers: (builder) => {
    builder
      // РЕГИСТРАЦИЯ
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ЛОГИН (логика почти такая же)
      .addCase(logIn.fulfilled, (state, action) => {
        // На основе твоего лога: action.payload — это {email, name, token}
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        // Сервер на /users/current обычно присылает { name, email } без токена
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.token = null; // Если токен невалидный, лучше его почистить
      });
  },
});

export const authReducer = authSlice.reducer;
