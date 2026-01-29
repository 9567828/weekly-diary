"use client";

import style from "./todo.module.scss";
import AddTodo from "../(addTodo)/AddTodo";
import TodoSection from "./TodoSection";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useFetchTodoByDate } from "@/hooks/useQuerys/useTodoQuery";
import EmptySpace from "@/components/ui/EmptySpace";
import { isDoneByDate, isTodoVisibleOnDate } from "@/utils/handlers";

export default function Todos() {
  const { date } = useParams();
  const today = format(new Date(), "yyyy-MM-dd");
  const dateStr = date ? (Array.isArray(date) ? date[0] : date) : today;

  const { data, error, isError } = useFetchTodoByDate(dateStr);

  // if (isError) {
  //   return null;
  // }

  const withDoneState = data?.filter((t) => isTodoVisibleOnDate(t, dateStr)) ?? [];
  const notDone = withDoneState?.filter((t) => !isDoneByDate(t, dateStr));
  const done = withDoneState?.filter((t) => isDoneByDate(t, dateStr));

  return (
    <>
      <div className={style["column"]}>
        <AddTodo />
        <TodoSection title="할일 목록" toDos={notDone} />
        <TodoSection title="완료 목록" toDos={done} />
      </div>
      <EmptySpace />
    </>
  );
}
