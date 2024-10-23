import { configureStore, createSlice, createAsyncThunk } from "https://cdn.skypack.dev/@reduxjs/toolkit";

// Exemplo de um slice com Redux Toolkit
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
    reset: state => { state.value = 0 }
  }
});

export const { increment, decrement, reset } = counterSlice.actions;

// AsyncThunk para chamada de API (simulação)
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return response.json();
});

// Store com os slices configurados
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    // Adicione outros slices aqui se necessário
  }
});
