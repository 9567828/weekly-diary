"use client";

import { createClient } from "../client";
import { AddTodoType, AmPmType, EditTodoType, RepeatMapType, TodoRow, TodoWithRepeatType } from "..";
import { Json } from "@/database.types";

export const insertTodo = async (text: string, todoDate: string) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const payload: AddTodoType = {
    text,
    user_id: user?.id!,
    todo_date: todoDate,
    repeat_map: { label: "안함", value: "none" },
  };

  const { data, error } = await supabase.from("todo").insert(payload).select().single();

  if (error) throw error;

  return data;
};

export const selectTodoAll = async () => {
  const supabase = createClient();

  const { data: row, error } = await supabase.from("todo").select("*").order("is_import", { ascending: false }).order("created_at", { ascending: false });

  if (error) throw error;

  const todo: TodoWithRepeatType[] = row.map((r) => ({ ...r, repeat_map: r.repeat_map as RepeatMapType }));

  return todo;
};

export const selectTodoByRange = async (startDate: string, endDate: string) => {
  const supabase = createClient();

  const { data: row, error } = await supabase
    .from("todo")
    .select("*")
    .order("is_import", { ascending: false })
    .order("created_at", { ascending: false })
    .or(`and(todo_date.gte.${startDate},todo_date.lt.${endDate}),and(is_repeat.eq.true,todo_date.lte.${endDate},or(repeat_until.is.null,repeat_until.gte.${startDate}))`);

  if (error) throw error;

  const todo: TodoWithRepeatType[] = row.map((r) => ({ ...r, repeat_map: r.repeat_map as RepeatMapType }));

  return todo ?? [];
};

export const selectTodoByDate = async (todoDate: string): Promise<TodoWithRepeatType[]> => {
  const supabase = createClient();

  const { data: row, error } = await supabase
    .from("todo")
    .select("*")
    .order("is_import", { ascending: false })
    .order("created_at", { ascending: false })
    .or(`todo_date.eq.${todoDate},and(is_repeat.eq.true,todo_date.lte.${todoDate},or(repeat_until.is.null,repeat_until.gte.${todoDate}))`);
  // const { data: row, error } = await supabase.from("todo").select("*").eq("todo_date", todoDate).order("is_import", { ascending: false }).order("created_at", { ascending: false });

  if (error) throw error;

  const todo: TodoWithRepeatType[] = row.map((r) => ({ ...r, repeat_map: r.repeat_map as RepeatMapType }));

  return todo ?? [];
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
  const repeat_map = props.payload.repeat_map as Json;

  const newPayload = {
    ...props.payload,
    repeat_map,
  };

  const { data, error } = await supabase.from("todo").update(newPayload).eq("id", id).select().single();

  if (error) throw error;

  return data;
};

export const deleteTodo = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("todo").delete().eq("id", id);

  if (error) throw error;
  return id;
};
