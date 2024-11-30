import { createSlice } from "@reduxjs/toolkit";
import { registerUser, logIn, current, logout } from "./operations";

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: () => initialState,
  },
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
      })
      .addCase(current.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(current.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(current.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
        state.status = "loaded";
      })
      .addCase(logout.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
