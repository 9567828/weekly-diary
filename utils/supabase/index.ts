import { Enums, Tables } from "@/database.types";

export type TodoRow = Tables<"todo">;
export type DiaryRow = Tables<"diary">;

export type AmPmType = Enums<"ampm_enum">;
export type RepeatType = Enums<"repeat_enum">;

export type AddTodoType = {
  text: string;
  user_id: string;
  todo_date: string;
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
  };
  id: string;
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
