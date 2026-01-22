"use client";

import style from "../calender.module.scss";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useFetchTodoAll } from "@/hooks/useQuerys/useTodoQuery";
import DaysOfWeekWrap from "../days-wrap/DaysWrap";
import DatesWrap from "../days-wrap/DatesWrap";

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
      <DaysOfWeekWrap />
      <ul className={style["date-wrap"]}>
        {weekDates.map((w, i) => {
          const date = w.getDate();
          const days = w.getDay();

          const todayStr = format(new Date(), "yyyy-MM-dd");

          const dateStr = format(w, "yyyy-MM-dd");

          const existed = data?.find((t) => t.todo_date === dateStr);

          return (
            <DatesWrap
              key={i}
              date={date}
              href={`/${dateStr}`}
              isActive={path === `/${dateStr}`}
              isExisted={existed}
              isToday={todayStr === dateStr}
              isWeekend={days === 0 || days === 6}
            />
          );
        })}
      </ul>
    </div>
  );
}
