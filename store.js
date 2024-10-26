import { configureStore } from "https://cdn.skypack.dev/@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

