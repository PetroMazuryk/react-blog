import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/apiBlog";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.get("/posts");

      return data;
    } catch (err) {
      console.error("Error in fetchPost:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
