import { IDiary } from "@/lib/diary/diary.interface";
import { ITodo } from "@/lib/todos/todo.interface";
import { format } from "date-fns";

export const convertTodo = (row: any): ITodo => ({
  id: row.id,
  text: row.text,
  userId: row.user_id,
  isDone: row.is_done,
  isImport: row.is_import,
  isTime: row.is_time,
  time: row.time,
  isAmpm: row.is_ampm,
  todoDate: format(new Date(row.todo_date), "yyyy-MM-dd"),
});

export const convertDiary = (row: any): IDiary => ({
  id: row.id,
  userId: row.user_id,
  title: row.title,
  text: row.text,
  diaryDate: row.diary_date,
});
