import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  addFavorite,
  removeFavorite,
  addPet,
  deletePet,
  updateUserInfo,
  fetchNoticeById,
  fetchNotices,
} from "./operations";

import type { User, AuthResponse, INotice } from "../../types/pet";

interface AuthState {
  user: User;
  token: string | null;
  notices: INotice[];
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: { name: null, email: null, favorites: [], pets: [], noticesViewed: [] },
  token: null,
  notices: [],
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          if (action.payload.user) {
            state.user = action.payload.user;
          }
          state.token = action.payload.token || null;
          state.isLoggedIn = true;
          state.isLoading = false;
        },
      )
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(
        logIn.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.user.name = action.payload.name || state.user.name;
          state.user.email = action.payload.email || state.user.email;
          state.token = action.payload.token || null;
          state.isLoggedIn = true;

          if (action.payload.phone) {
            state.user.phone = action.payload.phone;
          }

          if (action.payload.avatar) {
            state.user.avatarURL = action.payload.avatar;
          }

          if (action.payload.noticesFavorites) {
            state.user.favorites = action.payload.noticesFavorites;
          }
          if (action.payload.pets) {
            state.user.pets = action.payload.pets;
          }
        },
      )
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
          favorites: [],
          pets: [],
          noticesViewed: [],
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name || state.user.name;
        state.user.email = action.payload.email || state.user.email;

        if (action.payload.phone) {
          state.user.phone = action.payload.phone;
        }

        if (action.payload.avatar) {
          state.user.avatarURL = action.payload.avatar;
        }

        if (action.payload.pets) {
          state.user.pets = action.payload.pets;
        }

        if (action.payload.noticesFavorites) {
          state.user.favorites = action.payload.noticesFavorites;
        }

        state.isLoggedIn = true;
        state.isRefreshing = false;
      })

      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.token = null;
      })

      .addCase(addFavorite.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.user.favorites = action.payload;
        } else if (action.payload._id || typeof action.payload === "string") {
          const newFavId = action.payload._id || action.payload;

          const fullPet = state.notices.find((n) => n._id === newFavId);

          if (fullPet) {
            state.user.favorites.push(fullPet._id);
          }
        }
      })

      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.user.favorites = action.payload;
      })

      .addCase(addPet.fulfilled, (state, action) => {
        if (state.user) {
          state.user = {
            ...state.user,
            ...action.payload,
          };
        }
        state.isLoading = false;
      })

      .addCase(deletePet.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.isLoading = false;
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        const updatedUser = action.payload;

        const newPhoto = updatedUser.avatar || updatedUser.avatarURL;

        state.user = {
          ...state.user,
          ...updatedUser,

          avatarURL: newPhoto || state.user.avatarURL,
        };

        state.isLoading = false;
      })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        const viewedId = action.payload._id;

        if (viewedId && !state.user.noticesViewed.includes(viewedId)) {
          state.user.noticesViewed.push(viewedId);
        }
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.notices = action.payload.results || action.payload;
        state.isLoading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
