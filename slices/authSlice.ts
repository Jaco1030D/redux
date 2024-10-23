import { createSlice, createAsyncThunk } from "https://cdn.skypack.dev/@reduxjs/toolkit";
import authService from "../services/authService";
import { AppDispatch, RootState } from "../strore";
import { State, User, userLogin, userRegister } from "./types";
const userData = localStorage.getItem("user");
let user = null

if (userData) 
    user = JSON.parse(userData) as User;

const initialState: State = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
}>()
// Register a user and sign in
export const register = createAppAsyncThunk(
  "auth/register",
  async (user: userRegister, thunkAPI) => {
    const data = await authService.register(user);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0] as string);
    }

    return data;
  }
);

// Logout a user
export const logout = createAppAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Sing in a user
export const login = createAppAsyncThunk("auth/login", async (user: userLogin, thunkAPI) => {
  const data = await authService.login(user);

  // Check for errors
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export type actionsTypes = {
    payload: string
}

export const { reset } = authSlice.actions;
export default authSlice.reducer;
