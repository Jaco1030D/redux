import { configureStore } from "https://cdn.skypack.dev/@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { useDispatch } from "https://cdn.skypack.dev/react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
