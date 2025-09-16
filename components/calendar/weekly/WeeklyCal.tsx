"use client";

import Link from "next/link";
import style from "../calender.module.scss";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { fetchTodos } from "@/lib/todos/todo.thunk";
import DaysWrap from "../days-wrap/DaysWrap";

interface IWeekDate {
  weekDates: Date[];
}

export default function WeeklyCal({ weekDates }: IWeekDate) {
  const path = usePathname();
  const toDos = useAppSelector((state) => state.toDos.all);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      <DaysWrap />
      <ul className={style["date-wrap"]}>
        {weekDates.map((w, i) => {
          const date = w.getDate();
          const days = w.getDay();

          const todayStr = format(new Date(), "yyyy-MM-dd");

          const dateStr = format(w, "yyyy-MM-dd");

          const existed = toDos.find((t) => t.todoDate === dateStr);

          return (
            <li
              key={i}
              className={`${style["date-box"]} ${todayStr === dateStr ? style.today : ""} ${
                path === `/${dateStr}` ? style.active : ""
              }`.trim()}
            >
              <Link href={`/${dateStr}`} className={`${days === 0 || days === 6 ? style.weekend : ""}`.trim()}>
                {date}
              </Link>
              {existed ? <span className={style.dot}></span> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
