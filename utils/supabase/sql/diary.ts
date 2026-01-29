import { AddDiaryType, DiaryRow, EditDiaryType } from "..";
import { createClient } from "../service/client";

export const addDiary = async (props: AddDiaryType) => {
  const supabase = createClient();
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr) throw userErr;

  const { data, error } = await supabase.from("diary").insert({ ...props, user_id: user?.id });

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

export const selectDiaryByDate = async (date: string): Promise<{ diary_date: string | null }> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("diary").select("diary_date").eq("diary_date", date).maybeSingle();

  if (error) throw error;

  return { diary_date: data?.diary_date || null };
};

export const selectDiaryByRange = async (startDate: string, endDate: string): Promise<DiaryRow[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("diary").select("*").gte("diary_date", startDate).lt("diary_date", endDate);

  if (error) throw error;

  return data ?? [];
};
