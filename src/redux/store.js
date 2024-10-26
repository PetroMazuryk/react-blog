import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./posts/slice";
import { authReducer } from "./auth/slice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
