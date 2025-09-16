import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTodoThunk, checkDoneThunk, deleteTodoThunk, editTodoThunk, fetchDateTodos, fetchTodos } from "./todo.thunk";
import { ITodo } from "./todo.interface";

const initialState = {
  all: [] as ITodo[],
  currDate: [] as ITodo[],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodoThunk.fulfilled, (state, action: PayloadAction<ITodo>) => {
        state.all.unshift(action.payload);
        state.currDate.unshift(action.payload);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.all = action.payload ?? [];
      })
      // ✅ 다른 페이지로 이동할 때 currDate를 초기화
      .addCase(fetchDateTodos.pending, (state) => {
        state.currDate = [];
      })
      .addCase(fetchDateTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
        state.currDate = action.payload ?? [];
      })
      .addCase(checkDoneThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const allIdx = state.all.findIndex((t) => t.id === updated.id);
        if (allIdx >= 0) state.all[allIdx] = updated;

        const currDateIdx = state.currDate.findIndex((t) => t.id === updated.id);
        if (currDateIdx >= 0) state.currDate[currDateIdx] = updated;
      })
      .addCase(editTodoThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const allIdx = state.all.findIndex((t) => t.id === updated.id);
        if (allIdx >= 0) state.all[allIdx] = updated;

        const currDateIdx = state.currDate.findIndex((t) => t.id === updated.id);
        if (currDateIdx >= 0) state.currDate[currDateIdx] = updated;
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        const allIdx = state.all.findIndex((todo) => todo.id === action.payload);
        if (allIdx >= 0) state.all.splice(allIdx, 1);

        const currDateIdx = state.currDate.findIndex((todo) => todo.id === action.payload);
        if (currDateIdx >= 0) state.currDate.splice(currDateIdx, 1);
      });
  },
});

export default todoSlice.reducer;
