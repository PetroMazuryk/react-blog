import { createSlice } from "@reduxjs/toolkit";
import { registerUser, logIn } from "./operations";

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  redusers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(registerUser.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })
      .addCase(logIn.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(logIn.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
