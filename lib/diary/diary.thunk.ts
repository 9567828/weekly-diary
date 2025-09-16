import { convertDiary } from "@/utils/converter";
import { createClient } from "@/utils/supabase/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IDiary } from "./diary.interface";

export const addDiaryThunk = createAsyncThunk(
  "diary/addDiary",
  async ({ title, text, diaryDate, weekNum }: { title: string; text: string; diaryDate: string; weekNum: number }) => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload = {
      id: uuidv4(),
      user_id: user?.id,
      title,
      text,
      diary_date: diaryDate,
      week_num: weekNum,
    };

    const { data, error } = await supabase.from("diary").insert(payload).select().single();

    if (error) {
      console.log("diary insert error: ", error);
    }

    return convertDiary(data);
  }
);

export const selectAllDiary = createAsyncThunk("diary/selectAll", async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("diary").select("*");

  if (error) {
    console.log("diary selectall error: ", error);
  }

  return data?.map(convertDiary);
});

// 주차로 호출
// export const selectWeeklyDiary = createAsyncThunk("diary/selectWeekly", async (weekNum: number) => {
//   const supabase = createClient();

//   const { data, error } = await supabase.from("diary").select("*").eq("week_num", weekNum);

//   console.log(data);

//   if (error) {
//     console.log("다이어리 범위로 불러오는데 오류: ", error);
//   }

//   return data?.map(convertDiary);
// });

export const selectWeeklyDiary = createAsyncThunk(
  "diary/selectWeekly",
  async ({ weekStart, weekEnd }: { weekStart: string; weekEnd: string }) => {
    const supabase = createClient();

    const { data, error } = await supabase.from("diary").select("*").gte("diary_date", weekStart).lte("diary_date", weekEnd);

    if (error) {
      console.log("다이어리 범위로 불러오는데 오류: ", error);
    }

    return data?.map(convertDiary);
  }
);

export const selectOneDiary = createAsyncThunk<IDiary[], string>("diary/selectOne", async (diaryDate): Promise<IDiary[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.from("diary").select("*").eq("diary_date", diaryDate);

  if (error) {
    console.log("diary selectall error: ", error);
  }

  return (data ?? []).map(convertDiary);
});

export const editDiaryThunk = createAsyncThunk(
  "diary/editDiary",
  async ({ id, title, text }: { id: string; title: string; text: string }) => {
    const supabase = createClient();

    const payload = {
      text,
      title,
    };

    const { data, error } = await supabase.from("diary").update(payload).eq("id", id).select().single();

    if (error) {
      console.log("diary selectall error: ", error);
    }

    return convertDiary(data);
  }
);

export const deleteDiaryThunk = createAsyncThunk("diary/deleteDiary", async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("diary").delete().eq("id", id);

  if (error) {
    console.log("diary delete error: ", error);
  }

  return id;
});
