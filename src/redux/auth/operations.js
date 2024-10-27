import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/apiBlog";
import { setAuthHeader } from "../../services/apiBlog";

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.post("/users/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (err) {
      console.error("Error in fetchUserdata:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
