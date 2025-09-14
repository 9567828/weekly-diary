"use client";

import { useEffect } from "react";
import Todos from "../Todos";
import { fetchDateTodos } from "@/lib/todos/todo.thunk";
import { useAppDispatch } from "@/lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";

export default function Page() {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { date } = useParams();
  const today = format(new Date(), "yyyy-MM-dd");
  const dateStr = String(date);

  useEffect(() => {
    if (today === dateStr) {
      route.push("/");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchDateTodos(String(dateStr)));
  }, [dispatch]);

  return <Todos />;
}
