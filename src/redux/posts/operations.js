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

export const fetchLastTags = createAsyncThunk(
  "posts/fetchLastTags",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.get("/tags");

      return data;
    } catch (err) {
      console.error("Error in fetchPost:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.delete(`/posts/${id}`);

      return data;
    } catch (err) {
      console.error("Error in deletePost:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
