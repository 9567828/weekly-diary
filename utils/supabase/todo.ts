import { createClient } from "./client";

export const insertTodo = async (text: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("todo").insert({ text });

  return { data, error };
};
