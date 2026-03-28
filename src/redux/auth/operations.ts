import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  AddPetResponse,
  UpdateUserResponse,
} from "../../types/pet";
import type { RootState } from "../store";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk<AuthResponse, RegisterCredentials>(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", credentials);

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error: unknown) {
      const err = error as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const logIn = createAsyncThunk<AuthResponse, LoginCredentials>(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/signin", credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error: unknown) {
      const err = error as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/signout");
    clearAuthHeader();

    axios.defaults.headers.common.Authorization = "";
  } catch (error: unknown) {
    const err = error as Error;
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const refreshUser = createAsyncThunk<
  AuthResponse,
  void,
  { state: RootState }
>("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue("No token found");
  }

  try {
    setAuthHeader(persistedToken);

    const { data } = await axios.get("/users/current/full");
    return data;
  } catch (error: unknown) {
    const err = error as Error;
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const addFavorite = createAsyncThunk(
  "auth/addFavorite",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.post(`/notices/favorites/add/${id}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const removeFavorite = createAsyncThunk(
  "auth/removeFavorite",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.delete(`/notices/favorites/remove/${id}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const addPet = createAsyncThunk<AddPetResponse, FormData | object>(
  "auth/addPet",
  async (petData, thunkAPI) => {
    try {
      const { data } = await axios.post<AddPetResponse>(
        "/users/current/pets/add",
        petData,
      );
      return data;
    } catch (error: unknown) {
      const err = error as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const deletePet = createAsyncThunk<AuthResponse, string>(
  "auth/deletePet",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.delete(`/users/current/pets/remove/${id}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const updateUserInfo = createAsyncThunk<
  UpdateUserResponse,
  FormData | object
>("auth/updateUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.patch("/users/current/edit", userData);
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    return thunkAPI.rejectWithValue(err.message);
  }
});
