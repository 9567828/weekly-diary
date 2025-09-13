"use client";

import style from "./page.module.scss";
import AddTodo from "./(todos)/AddTodo";
import TodoSection from "./(todos)/TodoSection";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchTodos } from "@/lib/todos/todo.thunk";

export default function Home() {
  const dispatch = useAppDispatch();
  const toDos = useAppSelector((state) => state.toDos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className={style["column"]}>
      <AddTodo />
      <TodoSection title="할일 목록" toDos={toDos} filter={(t) => !t.isDone} />
      <TodoSection title="완료 목록" toDos={toDos} filter={(t) => t.isDone} />
    </div>
  );
}
