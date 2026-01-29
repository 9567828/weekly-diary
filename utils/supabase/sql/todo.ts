"use client";

import { AddTodoType, AmPmType, EditTodoCheck, EditTodoType, RepeatMapType, TodoRow, TodoWithRepeatType } from "..";
import { Json } from "@/database.types";
import { createClient } from "../service/client";

const JOIN_DOEN = `done:todo_done(todo_id, render_date, is_done, is_delete)`;

export const insertTodo = async (text: string, todoDate: string) => {
  const supabase = createClient();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr) throw userErr;

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

  const { data: row, error } = await supabase.from("todo").select(`*, ${JOIN_DOEN}`).order("is_import", { ascending: false }).order("created_at", { ascending: false });

  if (error) throw error;

  const todo: TodoWithRepeatType[] = row.map((r) => ({ ...r, repeat_map: r.repeat_map as RepeatMapType }));

  return todo;
};

export const selectTodoByRange = async (startDate: string, endDate: string) => {
  const supabase = createClient();

  const { data: row, error } = await supabase
    .from("todo")
    .select(`*, ${JOIN_DOEN}`)
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
    .select(`*, ${JOIN_DOEN}`)
    .order("is_import", { ascending: false })
    .order("created_at", { ascending: false })
    .or(`todo_date.eq.${todoDate},and(is_repeat.eq.true,todo_date.lte.${todoDate},or(repeat_until.is.null,repeat_until.gte.${todoDate}))`);

  if (error) throw error;

  const todo: TodoWithRepeatType[] = row.map((r) => ({ ...r, repeat_map: r.repeat_map as RepeatMapType }));

  return todo ?? [];
};

export const checkDoneTable = async (props: EditTodoCheck) => {
  const supabase = createClient();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr) throw userErr;

  const newObj = {
    ...props,
    updated_at: new Date().toISOString(),
    user_id: user?.id,
  };

  const { data, error } = await supabase.from("todo_done").upsert(newObj, { onConflict: "todo_id, render_date" }).select().single();
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

export const deleteTodo = async (id: string, render_date: string, isAll: boolean, isRepeat: boolean) => {
  const supabase = createClient();
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr) throw userErr;

  if (isRepeat) {
    if (isAll) {
      const { error: doneErr } = await supabase.from("todo_done").delete().eq("todo_id", id);
      if (doneErr) throw doneErr;
      const { error } = await supabase.from("todo").delete().eq("id", id);
      if (error) throw error;
      return id;
    } else {
      const payload = {
        updated_at: new Date().toISOString(),
        todo_id: id,
        render_date,
        is_delete: true,
        user_id: user?.id,
      };

      const { data, error } = await supabase.from("todo_done").upsert(payload, { onConflict: "todo_id, render_date" }).select().single();
      if (error) throw error;
      return data;
    }
  } else {
    const { error: doneErr } = await supabase.from("todo_done").delete().eq("todo_id", id).eq("render_date", render_date);
    const { error } = await supabase.from("todo").delete().eq("id", id);

    if (error) throw error;
    if (doneErr) throw doneErr;
    return id;
  }
};
