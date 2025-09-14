"use client";

import { v4 as uuidv4 } from "uuid";
import { createClient } from "../client";
import { ITodo } from "@/lib/todos/todo.interface";
import { convertTodo } from "@/utils/converter";

const getErrorMsg = (err: any) => {
  if (err) {
    console.log("todo테이블 에러: ", err);
    throw err;
  }
};

export const insertTodo = async (text: string, todoDate: string) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const payload = {
    id: uuidv4(),
    text,
    user_id: user?.id!,
    todo_date: todoDate,
  };

  const { data, error } = await supabase.from("todo").insert(payload).select().single();

  getErrorMsg(error);

  if (error || !data) throw error;

  return data;
};

export const selectTodo = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("todo").select("*").order("created_at", { ascending: false });

  getErrorMsg(error);

  return data;
};

export const selectTodoAsDate = async (todoDate: string): Promise<ITodo[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("todo")
    .select("*")
    .eq("todo_date", todoDate!)
    .order("created_at", { ascending: false });

  getErrorMsg(error);

  return (data ?? []).map(convertTodo);
};

export const checkDone = async (id: string, isDone: boolean) => {
  const payload = { is_done: isDone };
  const supabase = createClient();
  const { data, error } = await supabase.from("todo").update(payload).eq("id", id).select().single();

  getErrorMsg(error);
  return data;
};

export const editTodo = async (
  id: string,
  text: string,
  isImport: boolean,
  isTime: boolean,
  time: string,
  isAmpm: string,
  todoDate: string
) => {
  const supabase = createClient();

  const payload = {
    text,
    is_import: isImport,
    is_time: isTime,
    time,
    is_ampm: isAmpm,
    todo_date: todoDate,
  };

  const { data, error } = await supabase.from("todo").update(payload).eq("id", id).select().single();

  getErrorMsg(error);

  return data;
};

export const deleteTodo = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("todo").delete().eq("id", id);

  getErrorMsg(error);

  return id;
};
