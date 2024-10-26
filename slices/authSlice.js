import { createSlice, createAsyncThunk } from "https://cdn.skypack.dev/@reduxjs/toolkit@1.7.2";
import authService from "../services/authService.js";

const userData = localStorage.getItem("user");
let user = null;

if (userData) user = JSON.parse(userData);

// Estado inicial
const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Registrar um usuário e fazer login
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  const data = await authService.register(user);

  // Verificar erros
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// Logout de um usuário
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Login de um usuário
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const data = await authService.login(user);

  // Verificar erros
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// Definir o slice de autenticação
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

export const { reset } = authSlice.actions;
export default authSlice.reducer;
