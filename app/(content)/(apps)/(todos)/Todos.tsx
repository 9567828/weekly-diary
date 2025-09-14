"use client";

import style from "./todos.module.scss";
import AddTodo from "./AddTodo";
import TodoSection from "./TodoSection";
import { useAppSelector } from "@/lib/hooks";

export default function Todos() {
  const toDos = useAppSelector((state) => state.toDos);

  return (
    <div className={style["column"]}>
      <AddTodo />
      <TodoSection title="할일 목록" toDos={toDos} filter={(t) => !t.isDone} />
      <TodoSection title="완료 목록" toDos={toDos} filter={(t) => t.isDone} />
    </div>
  );
}
