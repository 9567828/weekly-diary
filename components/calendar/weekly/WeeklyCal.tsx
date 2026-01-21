"use client";

import Link from "next/link";
import style from "../calender.module.scss";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import DaysWrap from "../days-wrap/DaysWrap";
import { useFetchTodoAll } from "@/hooks/useQuerys/useTodoQuery";

interface IWeekDate {
  weekDates: Date[];
}

export default function WeeklyCal({ weekDates }: IWeekDate) {
  const path = usePathname();
  const { data, isError, error } = useFetchTodoAll();

  if (isError) {
    console.log(error.message);
  }

  return (
    <div>
      <DaysWrap />
      <ul className={style["date-wrap"]}>
        {weekDates.map((w, i) => {
          const date = w.getDate();
          const days = w.getDay();

          const todayStr = format(new Date(), "yyyy-MM-dd");

          const dateStr = format(w, "yyyy-MM-dd");

          const existed = data?.find((t) => t.todo_date === dateStr);

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
