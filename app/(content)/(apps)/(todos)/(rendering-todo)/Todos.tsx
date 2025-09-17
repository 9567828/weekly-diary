"use client";

import style from "./todos.module.scss";
import AddTodo from "../(addTodo)/AddTodo";
import TodoSection from "./TodoSection";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useEffect } from "react";
import { fetchDateTodos } from "@/lib/todos/todo.thunk";

export default function Todos() {
  const dispatch = useAppDispatch();
  const { date } = useParams();
  const today = format(new Date(), "yyyy-MM-dd");

  const dateStr = date ? (Array.isArray(date) ? date[0] : date) : today;

  const toDos = useAppSelector((state) => state.toDos.currDate);

  useEffect(() => {
    if (dateStr) {
      dispatch(fetchDateTodos(dateStr));
    }
  }, [dispatch]);

  return (
    <div className={style["column"]}>
      <AddTodo />
      <TodoSection title="할일 목록" toDos={toDos} filter={(t) => !t.isDone} />
      <TodoSection title="완료 목록" toDos={toDos} filter={(t) => t.isDone} />
    </div>
  );
}
