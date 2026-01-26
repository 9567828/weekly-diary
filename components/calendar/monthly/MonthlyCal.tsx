"use client";

import style from "../calender.module.scss";
import { dateStr, drawWeeks, makeWeekNum, today } from "../drawWeek";
import { format, parse } from "date-fns";
import { useFetchDiaryByRange } from "@/hooks/useQuerys/useDiaryQuery";
import DaysOfWeekWrap from "../days-wrap/DaysWrap";
import Link from "next/link";

export default function MonthlyCal({ allWeeks, currYear, currMonth }: { currYear: number; currMonth: number; allWeeks: Date[][] }) {
  const { getWeekStartFormatStr } = drawWeeks();

  const firstDate = new Date(currYear, currMonth - 1, 1);
  const endDate = new Date(currYear, currMonth, 1);

  const firstDateStr = format(firstDate, "yyyy-MM-dd");
  const endDateStr = format(endDate, "yyyy-MM-dd");

  const { data: diary, error: diaryErr, isError: isDiaryErr } = useFetchDiaryByRange(firstDateStr, endDateStr);

  if (isDiaryErr) {
    console.log("diary? ", diaryErr.message);
  }

  return (
    <div>
      <DaysOfWeekWrap />
      <div>
        {allWeeks.map((w, wIndex) => (
          <ul key={wIndex} className={`${style["week-wrap"]} ${style.monthly}`}>
            {w.map((d, i) => {
              const month = d.getMonth() + 1;
              const date = d.getDate();
              const days = d.getDay();
              const todayStr = dateStr(today());
              const weekStart = getWeekStartFormatStr(parse(dateStr(d), "yyyy-MM-dd", new Date()));

              const findDiary = diary?.find((diary) => diary.diary_date === dateStr(d));

              return (
                <li key={i} className={`${style["date-box"]} ${style.monthly}`}>
                  <Link href={`/diary/${weekStart}#${dateStr(d)}`}>
                    <div className={`${style.date} ${todayStr === dateStr(d) ? style.today : ""} ${days === 0 || days === 6 ? style.weekend : ""} ${currMonth !== month ? style["other-date"] : ""}`.trim()}>
                      <span>{date}</span>
                    </div>
                    <div className={style.icon}>{findDiary?.diary_date === dateStr(d) ? <img src="/imgs/icons/ic_complete.svg" alt="완료" /> : <img src="/imgs/icons/ic_incomplete.svg" alt="미완료" />}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
