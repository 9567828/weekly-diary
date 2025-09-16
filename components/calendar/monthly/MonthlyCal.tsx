"use client";

import DaysWrap from "../days-wrap/DaysWrap";
import style from "../calender.module.scss";
import { dateStr, drawMonth, makeWeekNum, today } from "../drawWeek";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectAllDiary } from "@/lib/diary/diary.thunk";
import { fetchTodos } from "@/lib/todos/todo.thunk";

export default function MonthlyCal({ allWeeks, currMonth }: { currMonth: number; allWeeks: Date[][] }) {
  const path = usePathname();
  const dispatch = useAppDispatch();
  const toDos = useAppSelector((state) => state.toDos.all);
  const diaries = useAppSelector((state) => state.diaries.all);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(selectAllDiary());
  }, [dispatch]);

  return (
    <div>
      <DaysWrap />
      <div>
        {allWeeks.map((w, i) => (
          <ul key={i} className={style["week-wrap"]}>
            {w.map((d, i) => {
              const weekNum = makeWeekNum(d);
              const year = d.getFullYear();
              const month = d.getMonth() + 1;
              const date = d.getDate();
              const days = d.getDay();
              const todayStr = dateStr(today());

              console.log(currMonth, month);

              const findTodo = toDos.find((t) => t.todoDate === dateStr(d));
              const findDiary = diaries.find((diary) => diary.diaryDate === dateStr(d));

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
