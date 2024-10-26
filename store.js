import { configureStore } from "https://cdn.skypack.dev/@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import { useDispatch } from "https://cdn.skypack.dev/react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

// Remoção de tipos TypeScript
export const useAppDispatch = () => useDispatch();
