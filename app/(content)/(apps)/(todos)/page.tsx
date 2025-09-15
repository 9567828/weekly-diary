"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { fetchDateTodos } from "@/lib/todos/todo.thunk";
import Todos from "./Todos";
import { format } from "date-fns";
import DatePanel from "@/components/layouts/datepanel/DatePanel";

export default function Home() {
  const dispatch = useAppDispatch();
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    dispatch(fetchDateTodos(today));
  }, [dispatch]);

  return (
    <>
      <Todos />
    </>
  );
}
