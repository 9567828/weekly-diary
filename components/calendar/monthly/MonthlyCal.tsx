"use client";

import DaysWrap from "../days-wrap/DaysWrap";
import style from "../calender.module.scss";
import { dateStr, makeWeekNum, today } from "../drawWeek";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useFetchTodosByRange } from "@/hooks/useQuerys/useTodoQuery";
import { format } from "date-fns";
import { useFetchDiaryByRange } from "@/hooks/useQuerys/useDiaryQuery";

export default function MonthlyCal({
  allWeeks,
  currYear,
  currMonth,
}: {
  currYear: number;
  currMonth: number;
  allWeeks: Date[][];
}) {
  const path = usePathname();

  const firstDate = new Date(currYear, currMonth - 1, 1);
  const endDate = new Date(currYear, currMonth, 0);
  const firstDateStr = format(firstDate, "yyyy-MM-dd");
  const endDateStr = format(endDate, "yyyy-MM-dd");

  const { data: todo, error: todoErr, isError: isTodoErr } = useFetchTodosByRange(firstDateStr, endDateStr);
  const { data: diary, error: diaryErr, isError: isDiaryErr } = useFetchDiaryByRange(firstDateStr, endDateStr);

  if (isTodoErr && isDiaryErr) {
    console.log("todo? ", todoErr.message);
    console.log("diary? ", diaryErr.message);
  }

  return (
    <div>
      <DaysWrap />
      <div>
        {allWeeks.map((w, wIndex) => (
          <ul key={wIndex} className={style["week-wrap"]}>
            {w.map((d, i) => {
              const weekNum = makeWeekNum(d);
              const year = d.getFullYear();
              const month = d.getMonth() + 1;
              const date = d.getDate();
              const days = d.getDay();
              const todayStr = dateStr(today());

              const findTodo = todo?.find((t) => t.todo_date === dateStr(d));
              const findDiary = diary?.find((diary) => diary.diary_date === dateStr(d));

              return (
                <li
                  key={i}
                  className={`${style["date-box"]} ${todayStr === dateStr(d) ? style.today : ""} ${
                    path === `/calendar/${dateStr(d)}` ? style.active : ""
                  } ${currMonth !== month ? style["other-date"] : ""}`.trim()}
                >
                  <Link href={`/calendar/${dateStr(d)}`} className={`${days === 0 || days === 6 ? style.weekend : ""}`.trim()}>
                    {date}
                  </Link>
                  {findTodo || findDiary ? <span className={style.dot}></span> : null}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
