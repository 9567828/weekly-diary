import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTodoThunk, fetchTodos } from "./todo.thunk";
import { ITodo } from "./todo.interface";

const initialState: ITodo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodoThunk.fulfilled, (state, action: PayloadAction<ITodo>) => {
        state.unshift(action.payload);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

// reducers: {
//   add: (state, action: PayloadAction<{ id: string; text: string }>) => {},
//   remove: (state, action: PayloadAction<string>) => {
//     return state.filter((todo) => todo.id !== action.payload);
//   },
//   edit: (state, action: PayloadAction<ITodo>) => {
//     return state.map((todo) => (todo.id === action.payload.id ? action.payload : todo));
//   },
// },

export default todoSlice.reducer;
