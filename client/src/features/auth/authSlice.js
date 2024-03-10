import axios from "axios";
import Axios from "../../utils/Axios";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  status: "IDLE",
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.statusMessage = null;
      state.status = "IDLE";
    },
  },
  extraReducers: (builder) => {
    builder
      // for logoutUser ->>
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "IDLE";
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = "ERROR";
      })
      .addMatcher(
        isAnyOf(loadUser.fulfilled, signup.fulfilled, signin.fulfilled),
        (state, action) => {
          state.isAuthenticated = true;
          state.status = "IDLE";
          state.user = action.payload?.user;
        }
      )
      .addMatcher(
        isAnyOf(loadUser.rejected, signup.rejected, signin.rejected),
        (state, action) => {
          state.isAuthenticated = false;
          state.status = "ERROR";
          state.errorMessage = action.payload;
        }
      );
  },
});

export const loadUser = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/auth/me");

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await Axios.post("/auth/signup", formData, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signin = createAsyncThunk(
  "user/signin",
  async (formData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/auth/signin",
        formData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get("/auth/logout");

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export default authSlice.reducer;
