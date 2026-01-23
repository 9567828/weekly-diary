"use client";

import { createClient } from "../client";
import { AddTodoType, AmPmType, EditTodoType, TodoRow } from "..";

export const insertTodo = async (text: string, todoDate: string) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const payload: AddTodoType = {
    text,
    user_id: user?.id!,
    todo_date: todoDate,
  };

  const { data, error } = await supabase.from("todo").insert(payload).select().single();

  if (error) throw error;

  return data;
};

export const selectTodoAll = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("todo")
    .select("*")
    .order("is_import", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const selectTodoByRange = async (startDate: string, endDate: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("todo")
    .select("todo_date")
    .order("is_import", { ascending: false })
    .order("created_at", { ascending: false })
    .gte("todo_date", startDate)
    .lt("todo_date", endDate);

  if (error) throw error;

  return data;
};

export const selectTodoByDate = async (todoDate: string): Promise<TodoRow[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("todo")
    .select("*")
    .eq("todo_date", todoDate)
    .order("is_import", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
};

export const checkDone = async (id: string, isDone: boolean, updated_at: string) => {
  const payload = { is_done: isDone, updated_at };
  const supabase = createClient();
  const { data, error } = await supabase.from("todo").update(payload).eq("id", id).select().single();

  if (error) throw error;
  return data;
};

export const editTodo = async (props: EditTodoType) => {
  const supabase = createClient();

  const id = props.id;

  const { data, error } = await supabase.from("todo").update(props.payload).eq("id", id).select().single();

  if (error) throw error;

  return data;
};

export const deleteTodo = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("todo").delete().eq("id", id);

  if (error) throw error;
  return id;
};
