import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  UpdateUserResponse,
  UpdateUserValues,
  PetFormValues,
  PetResponse,
} from "../../types/pet";
import type { RootState } from "../store";

interface PetApiPayload extends Omit<PetFormValues, "imgURL"> {
  imgURL: string;
}

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

export const addPet = createAsyncThunk<
  PetResponse,
  PetFormValues,
  { rejectValue: string }
>("pets/add", async (petData: PetFormValues, thunkAPI) => {
  try {
    let finalImgURL = "";

    if (petData.imgURL instanceof File) {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const formData = new FormData();
      formData.append("file", petData.imgURL);
      formData.append("upload_preset", preset);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!cloudRes.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const cloudData = await cloudRes.json();
      finalImgURL = cloudData.secure_url;
    } else {
      finalImgURL = petData.imgURL;
    }

    if (!finalImgURL) {
      return thunkAPI.rejectWithValue("Pet image is required");
    }

    const apiPayload: PetApiPayload = {
      title: petData.title,
      name: petData.name,
      birthday: petData.birthday,
      species: petData.species,
      sex: petData.sex,
      imgURL: finalImgURL,
    };

    const response = await axios.post("/users/current/pets/add", apiPayload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
});

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
  UpdateUserValues,
  { rejectValue: string }
>("auth/update", async (userData, thunkAPI) => {
  try {
    let avatarUrl = userData.avatar;

    if (userData.avatar instanceof File) {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const cloudFormData = new FormData();
      cloudFormData.append("file", userData.avatar);
      cloudFormData.append("upload_preset", preset);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: cloudFormData,
        },
      );

      if (!cloudRes.ok) {
        const errorData = await cloudRes.json();
        throw new Error(errorData.error?.message || "Cloudinary upload failed");
      }

      const cloudData = await cloudRes.json();
      avatarUrl = cloudData.secure_url;
    }

    const response = await axios.patch("/users/current/edit", {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      avatar: avatarUrl,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }

    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
});
