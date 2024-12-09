import { createSlice } from "@reduxjs/toolkit";
import { registerUser, logIn, current, logout } from "./operations";

const initialState = {
  data: null,
  status: "loading",
};
const handlePending = (state) => {
  state.data = null;
  state.status = "loading";
};

const handleRejected = (state) => {
  state.data = null;
  state.status = "error";
};

const handleFulfilled = (state, action) => {
  state.data = action.payload;
  state.status = "loaded";
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, handleFulfilled)
      .addCase(logIn.rejected, handleRejected)
      .addCase(current.pending, handlePending)
      .addCase(current.fulfilled, handleFulfilled)
      .addCase(current.rejected, handleRejected)
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
        state.status = "loaded";
      })
      .addCase(logout.rejected, handleRejected);
  },
});

export const { resetAuthState } = authSlice.actions;
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
