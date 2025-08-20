import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      state.unshift(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    edit: (state, action: PayloadAction<Todo>) => {
      return state.map((todo) => (todo.id === action.payload.id ? action.payload : todo));
    },
  },
});

export const { add, remove, edit } = todoSlice.actions;
export default todoSlice.reducer;
