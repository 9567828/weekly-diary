import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkDone, deleteTodo, editTodo, insertTodo, selectTodo, selectTodoAsDate } from "@/utils/supabase/sql/todo";
import { convertTodo } from "@/utils/converter";
import { ITodo } from "./todo.interface";

export const addTodoThunk = createAsyncThunk("todos/addTodo", async ({ text, todoDate }: { text: string; todoDate: string }) => {
  const row = await insertTodo(text, todoDate);
  return convertTodo(row);
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return (await selectTodo())?.map(convertTodo);
});

export const fetchDateTodos = createAsyncThunk<ITodo[], string>("todos/fetchDateTodos", async (todoDate): Promise<ITodo[]> => {
  return await selectTodoAsDate(todoDate);
});

export const checkDoneThunk = createAsyncThunk("todos/checkDone", async ({ id, isDone }: { id: string; isDone: boolean }) => {
  const row = await checkDone(id, isDone);
  return convertTodo(row);
});

export const editTodoThunk = createAsyncThunk(
  "todos/editTodo",
  async ({
    id,
    text,
    isImport,
    isTime,
    time,
    isAmpm,
    todoDate,
  }: {
    id: string;
    text: string;
    isImport: boolean;
    isTime: boolean;
    time: string;
    isAmpm: string;
    todoDate: string;
  }) => {
    const row = await editTodo(id, text, isImport, isTime, time, isAmpm, todoDate);
    return convertTodo(row);
  }
);

export const deleteTodoThunk = createAsyncThunk("todos/deleteTodo", async (id: string) => {
  return await deleteTodo(id);
});
