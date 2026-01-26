"use client";

import style from "../calender.module.scss";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useFetchTodosByRange } from "@/hooks/useQuerys/useTodoQuery";
import DaysOfWeekWrap from "../days-wrap/DaysWrap";
import DatesWrap from "../days-wrap/DatesWrap";
import { dateStr } from "../drawWeek";
import { isTodoVisibleOnDate } from "@/utils/handlers";

interface IWeekDate {
  weekDates: Date[];
}

export default function WeeklyCal({ weekDates }: IWeekDate) {
  const path = usePathname();
  const weekStart = dateStr(weekDates[0]);
  const weekEnd = dateStr(weekDates[weekDates.length - 1]);

  const { data, isError, error } = useFetchTodosByRange(weekStart, weekEnd);

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

          const hasDot = data?.some((t) => isTodoVisibleOnDate(t, dateStr));
          return (
            <DatesWrap
              key={i}
              date={date}
              href={`/${dateStr}`}
              isActive={path === `/${dateStr}`}
              isExisted={hasDot}
              isToday={todayStr === dateStr}
              isWeekend={days === 0 || days === 6}
            />
          );
        })}
      </ul>
    </div>
  );
}
