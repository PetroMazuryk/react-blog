import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../services/apiBlog";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.post("/users/login", params);
      return data;
    } catch (err) {
      console.error("Error in fetchUserdata:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
