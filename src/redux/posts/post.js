import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      });
  },
});

export const postsReducer = postSlice.reducer;
