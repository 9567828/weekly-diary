import { Enums, Json, Tables } from "@/database.types";

export type TodoRow = Tables<"todo">;
export type DiaryRow = Tables<"diary">;
export type CoverRow = Tables<"month_cover">;

export type AmPmType = Enums<"ampm_enum">;
export type RepeatType = Enums<"repeat_enum">;
export type RepeatKrType = Enums<"repeat_kr_enum">;

export type RepeatMapType = {
  label: RepeatKrType;
  value: RepeatType;
};

export type DiaryDateType = { diary_date: string | null };

export type TodoWithRepeatType = {
  id: string;
  day_of_week: number[] | null;
  is_ampm: AmPmType;
  done: {
    todo_id: string;
    is_done: boolean | null;
    render_date: string | null;
    is_delete: boolean | null;
  }[];
  is_import: boolean | null;
  is_time: boolean | null;
  is_repeat: boolean | null;
  is_month_end: boolean | null;
  repeat_map: RepeatMapType | null;
  repeat_until: string | null;
  text: string | null;
  time: string | null;
  todo_date: string;
  user_id?: string;
};

export type AddTodoType = {
  text: string;
  user_id: string;
  todo_date: string;
  repeat_map: Json | null;
};

export type EditTodoType = {
  payload: {
    updated_at: string;
    text: string;
    is_import: boolean;
    is_time: boolean;
    time: string;
    is_ampm: AmPmType;
    todo_date: string;
    is_repeat: boolean;
    is_month_end: boolean;
    day_of_week: number[] | null;
    repeat_until: string | null;
    repeat_map: RepeatMapType;
  };
  id: string;
};

export type EditTodoCheck = {
  render_date: string;
  is_done: boolean;
  todo_id: string;
};

export type AddDiaryType = {
  title: string;
  text: string;
  diary_date: string;
  week_num: number;
};

export type EditDiaryType = {
  payload: {
    title: string;
    text: string;
    updated_at: string;
  };
  id: string;
};

export type AddCoverType = {
  user_id: string;
  path: string;
  base_path: string;
  year: number;
  month: number;
};
