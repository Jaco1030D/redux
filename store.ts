import { configureStore } from "https://cdn.skypack.dev/@reduxjs/toolkit";
import fileSlice from "./slices/fileSlice";
import authReducer from "./slices/authSlice";
import workspaceReducer from "./slices/workspaceSlice";
import projectReducer from "./slices/projectSlice";
import segmentReducer from "./slices/segmentSlice";
import { useDispatch } from "https://cdn.skypack.dev/react-redux";

export const store = configureStore({
  reducer: {
    file: fileSlice,
    auth: authReducer,
    workspace: workspaceReducer,
    project: projectReducer,
    segment: segmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
