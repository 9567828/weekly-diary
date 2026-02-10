import { AddDiaryType, DiaryDateType, DiaryRow, EditDiaryType } from "..";
import { createClient } from "../service/client";
import { getUserIdClient } from "./authClient";

export const addDiary = async (props: AddDiaryType) => {
  const supabase = createClient();

  const userId = await getUserIdClient();
  if (!userId) throw new Error("unauthenticated");

  const { data, error } = await supabase.from("diary").insert({ ...props, user_id: userId });

  if (error) throw error;

  return data;
};

export const updateDiary = async (props: EditDiaryType) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("diary").update(props.payload).eq("id", props.id).select().single();

  if (error) throw error;

  return data;
};

export const deleteDiary = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("diary").delete().eq("id", id);

  if (error) throw error;

  return id;
};

export const selectDiaryByDate = async (date: string): Promise<DiaryDateType> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("diary").select("diary_date").eq("diary_date", date).maybeSingle();

  if (error) throw error;

  return { diary_date: data?.diary_date || null };
};

export const selectDiaryByRange = async <T>(startDate: string, endDate: string, select: "*" | "diary_date") => {
  const supabase = createClient();

  const { data, error } = await supabase.from("diary").select(select).gte("diary_date", startDate).lt("diary_date", endDate);

  if (error) throw error;

  return (data as T[]) ?? [];
};
