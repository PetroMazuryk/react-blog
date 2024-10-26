import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "./operations";

const initialState = {
  data: null,
  // token: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  redusers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.data = action.payload;
        // state.token = action.payload.token;
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
