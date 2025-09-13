"use client";

import { v4 as uuidv4 } from "uuid";
import { createClient } from "./client";
import { Tables, TablesInsert, TablesUpdate } from "@/database.types";

type TodoUpdate = TablesUpdate<"todo">;
type TodoInsert = TablesInsert<"todo">;
type TodoRow = Tables<"todo">;

const getErrorMsg = (err: any) => {
  if (err) {
    console.log("todo테이블 에러: ", err);
  }
};

export const insertTodo = async (text: string) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const payload: TablesInsert<"todo"> = {
    id: uuidv4(),
    text,
    user_id: user?.id!,
  };

  const { data, error } = await supabase
    .from("todo")
    .insert({ id: uuidv4(), text, user_id: user?.id } as any)
    .select()
    .single();

  getErrorMsg(error);

  if (error || !data) throw error;

  return data;
};

export const selectTodo = async () => {
  const supabase = createClient();

  const { data } = await supabase.from("todo").select("*").order("created_at", { ascending: false });

  return data;
};

export const checkDone = async (id: string, isDone: boolean) => {
  // const payload: TablesUpdate<"todo"> = { is_done: isDone };
  const payload = { is_done: isDone };
  const supabase = createClient();
  const { data, error } = await supabase.from("todo").update(payload).eq("id", id).select().single();

  if (error) throw error;
  return data;
};

// export const editTodo = async ({ ...props }: ITodo) => {
//   const { isImport, isTime, time, text, id } = props;
//   const supabase = createClient();
//   const { data } = await supabase.from("todo").update({}).eq("id", id).select().single();
// };
