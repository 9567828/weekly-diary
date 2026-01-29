"use client";

import style from "../calender.module.scss";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useFetchTodosByRange } from "@/hooks/useQuerys/useTodoQuery";
import DaysOfWeekWrap from "../days-wrap/DaysWrap";
import DatesWrap from "../days-wrap/DatesWrap";
import { dateStr } from "../drawWeek";
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
          const date = w.getDate();
          const days = w.getDay();

          const todayStr = format(new Date(), "yyyy-MM-dd");

          const dateStr = format(w, "yyyy-MM-dd");
          const todoCnt = safeData?.filter((t) => isTodoVisibleOnDate(t, dateStr));
          const notDone = todoCnt?.filter((t) => !isDoneByDate(t, dateStr));
          const done = todoCnt?.filter((t) => isDoneByDate(t, dateStr));

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
              href={`/${dateStr}`}
              cnt={isFetching || !notDone?.length ? 0 : notDone.length}
              isDone={!isFetching && !allNotDone && notDone!.length > 0}
              allDone={!isFetching && allDone}
              isActive={path === `/${dateStr}`}
              isToday={todayStr === dateStr}
              isWeekend={days === 0 || days === 6}
            />
          );
        })}
      </ul>
    </div>
  );
}
