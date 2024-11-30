import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/apiBlog";
import { setAuthHeader } from "../../services/apiBlog";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.post("/users/register", credentials);

      setAuthHeader(data.token);
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
      setAuthHeader(data.token);
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
    setAuthHeader();
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const current = createAsyncThunk(
  "auth/current",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.get("/users/current", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      console.error("Error in login:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
