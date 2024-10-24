import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./posts/post";
import { authReducer } from "./auth/auth";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
