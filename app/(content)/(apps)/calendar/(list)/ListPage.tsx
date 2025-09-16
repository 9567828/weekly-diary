"use client";

import { useParams } from "next/navigation";
import HasList from "./HasList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchDateTodos } from "@/lib/todos/todo.thunk";
import { selectOneDiary } from "@/lib/diary/diary.thunk";
import { today } from "@/components/calendar/drawWeek";
import { format } from "date-fns";

export default function ListPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const toDos = useAppSelector((state) => state.toDos.currDate);
  const diaries = useAppSelector((state) => state.diaries.currDate);

  const currDate = id ? String(id) : format(today(), "yyyy-MM-dd");

  useEffect(() => {
    dispatch(fetchDateTodos(currDate));
  }, [dispatch]);

  useEffect(() => {
    dispatch(selectOneDiary(currDate));
  }, [dispatch]);

  return (
    <>
      <HasList toDos={toDos} diaries={diaries} currDate={currDate} />
    </>
  );
}
