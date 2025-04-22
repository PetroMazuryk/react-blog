import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/apiBlog";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.post("/users/register", credentials);
      window.localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Error in register:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.post("/users/login", credentials);
      window.localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Error in login:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await apiInstance.post("/users/logout");
    window.localStorage.removeItem("token");
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const current = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.get("/users/current");
      return data;
    } catch (error) {
      console.error("Error in current:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
