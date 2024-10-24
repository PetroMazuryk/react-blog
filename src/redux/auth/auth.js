import { createSlice } from "@reduxjs/toolkit";
import { login } from "./operations";

const initialState = {
  data: null,
  token: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  redusers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
