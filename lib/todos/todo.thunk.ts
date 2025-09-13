import { createAsyncThunk } from "@reduxjs/toolkit";
import { insertTodo, selectTodo } from "@/utils/supabase/sql/todo";
import { ITodo } from "./todo.interface";
import { convertTodo } from "@/utils/converter";

export const addTodoThunk = createAsyncThunk("todos/addTodo", async (text: string) => {
  return await insertTodo(text);
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return (await selectTodo())?.map(convertTodo);
});
