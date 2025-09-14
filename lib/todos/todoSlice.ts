import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTodoThunk, checkDoneThunk, deleteTodoThunk, editTodoThunk, fetchDateTodos, fetchTodos } from "./todo.thunk";
import { ITodo } from "./todo.interface";

// const initialState = {
//   currentDate: [] as ITodo[],
//   all: [] as ITodo[],
// };

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
      })
      .addCase(fetchDateTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
        return action.payload;
      })
      .addCase(checkDoneThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const idx = state.findIndex((t) => t.id === updated.id);
        if (idx >= 0) state[idx] = updated;
      })
      .addCase(editTodoThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;
        const idx = state.findIndex((t) => t.id === updated.id);
        if (idx >= 0) state[idx] = updated;
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        const idx = state.findIndex((todo) => todo.id === action.payload);
        if (idx >= 0) state.splice(idx, 1);
      });
    // .addCase(addTodoThunk.fulfilled, (state, action: PayloadAction<ITodo>) => {
    //   state.all.unshift(action.payload);
    // })
    // .addCase(fetchTodos.fulfilled, (state, action) => {
    //   state.all = action.payload ?? [];
    // })
    // .addCase(fetchDateTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
    //   state.currentDate = action.payload;
    // })
    // .addCase(checkDoneThunk.fulfilled, (state, action) => {
    //   const updated = action.payload;
    //   if (!updated) return;

    //   const idx = state.all.findIndex((t) => t.id === updated.id);
    //   if (idx >= 0) state.all[idx] = updated;
    // })
    // .addCase(editTodoThunk.fulfilled, (state, action) => {
    //   const updated = action.payload;
    //   if (!updated) return;
    //   const idx = state.all.findIndex((t) => t.id === updated.id);
    //   if (idx >= 0) state.all[idx] = updated;
    // })
    // .addCase(deleteTodoThunk.fulfilled, (state, action) => {
    //   const idx = state.all.findIndex((todo) => todo.id === action.payload);
    //   if (idx >= 0) state.all.splice(idx, 1);
    // });
  },
});

export default todoSlice.reducer;
