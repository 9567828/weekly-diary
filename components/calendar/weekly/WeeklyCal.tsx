"use client";

import style from "../calender.module.scss";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useFetchTodosByRange } from "@/hooks/useQuerys/useTodoQuery";
import DaysOfWeekWrap from "../days-wrap/DaysWrap";
import DatesWrap from "../days-wrap/DatesWrap";
import { dateStr, today } from "../drawWeek";
import { isDoneByDate, isTodoVisibleOnDate } from "@/utils/handlers";

interface IWeekDate {
  weekDates: Date[];
}

export default function WeeklyCal({ weekDates }: IWeekDate) {
  const path = usePathname();
  const weekStart = dateStr(weekDates[0]);
  const weekEnd = dateStr(weekDates[weekDates.length - 1]);

  const { data, isError, error, isLoading, isFetching } = useFetchTodosByRange(weekStart, weekEnd);

  const safeData = isFetching ? [] : data;

  if (isError) {
    console.log(error.message);
  }

  return (
    <div>
      <DaysOfWeekWrap />
      <ul className={style["date-wrap"]}>
        {weekDates.map((w, i) => {
          const normalized = new Date(w.getFullYear(), w.getMonth(), w.getDate());
          const date = normalized.getDate();
          const days = normalized.getDay();

          const todayStr = dateStr(today());

          console.log(todayStr);

          const dateStrForm = dateStr(normalized);
          const todoCnt = safeData?.filter((t) => isTodoVisibleOnDate(t, dateStrForm));
          const notDone = todoCnt?.filter((t) => !isDoneByDate(t, dateStrForm));
          const done = todoCnt?.filter((t) => isDoneByDate(t, dateStrForm));

          let allDone;
          let allNotDone;
          if (todoCnt?.length !== 0) {
            allDone = todoCnt?.length === done?.length;
            allNotDone = todoCnt?.length === notDone?.length;
          }

          return (
            <DatesWrap
              key={i}
              date={date}
              href={`/${dateStrForm}`}
              cnt={isFetching || !notDone?.length ? 0 : notDone.length}
              isDone={!isFetching && !allNotDone && notDone!.length > 0}
              allDone={!isFetching && allDone}
              isActive={path === `/${dateStrForm}`}
              isToday={todayStr === dateStrForm}
              isWeekend={days === 0 || days === 6}
            />
          );
        })}
      </ul>
    </div>
  );
}
