import { ITodo } from "@/lib/todos/todo.interface";

export const convertTodo = (row: any): ITodo => ({
  id: row.id,
  text: row.text,
  userId: row.user_id,
  isDone: row.is_done,
  isImport: row.is_import,
  isTime: row.is_time,
  time: row.time,
  todoDate: row.todo_date,
});
