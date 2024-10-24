import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/apiBlog";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const login = createAsyncThunk(
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
