"use client";

import style from "./todos.module.scss";
import AddTodo from "../(addTodo)/AddTodo";
import TodoSection from "./TodoSection";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useFetchTodoByDate } from "@/hooks/useQuerys/useTodoQuery";

export default function Todos() {
  const { date } = useParams();
  const today = format(new Date(), "yyyy-MM-dd");
  const dateStr = date ? (Array.isArray(date) ? date[0] : date) : today;

  const { data, error } = useFetchTodoByDate(dateStr);

  const toDos = data ?? [];

  return (
    <div className={style["column"]}>
      <AddTodo />
      <TodoSection title="할일 목록" toDos={toDos} filter={(t) => !t.is_done} />
      <TodoSection title="완료 목록" toDos={toDos} filter={(t) => t.is_done} />
    </div>
  );
}
