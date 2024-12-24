/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppRestAPI } from "../../api";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
  error: null,
};

// Async Thunks
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      console.log(credentials);
      const response = await AppRestAPI.auth.login(credentials);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const meThunk = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AppRestAPI.auth.me();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Me failed");
    }
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (payload: SignupPayload, { rejectWithValue }) => {
    try {
      const response = await AppRestAPI.auth.signup(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AppRestAPI.auth.logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: User;
            access_token: string;
            refresh_token: string;
          }>
        ) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.access_token;
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(meThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(meThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(meThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const authReducer = authSlice.reducer;
