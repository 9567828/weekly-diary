"use client";

import style from "../diary.module.scss";
import AddDiary from "../(add-diary)/AddDiary";
import DiaryContent from "./DiaryContent";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { selectWeeklyDiary } from "@/lib/diary/diary.thunk";
import { dateStr, drawWeeks } from "@/components/calendar/drawWeek";
import { useParams, usePathname } from "next/navigation";
import { parse } from "date-fns";

export default function DiaryBox({ weekStart }: { weekStart: Date }) {
  const { weekDates } = drawWeeks();
  // const [weekStart, setWeekStart] = useState<Date>(getTodayWeek());

  const diaries = useAppSelector((state) => state.diaries.range);
  // const { id } = useParams();

  // useEffect(() => {
  //   const raw = Array.isArray(id) ? id[0] : id;
  //   if (!raw) return;
  //   const s = raw.slice(0, 10);
  //   setWeekStart(parse(s, "yyyy-MM-dd", new Date()));
  // }, [id]);

  return (
    <div className={style["diary-list"]}>
      {weekDates(weekStart).map((w, i) => {
        const list = dateStr(w);
        const dateNum = w.getDate();
        const day = w.getDay();
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const findDiary = diaries.find((d) => d.diaryDate === list);
        return (
          <div key={i} className={style["diary-container"]} data-date={dateStr(w)}>
            <div className={style["date-box"]}>
              <p className={`${style.date} ${day === 0 || day === 6 ? style.weekend : ""}`.trim()}>{`${dateNum}일`}</p>
              <p className={style.day}>{`${days[day]}요일`}</p>
            </div>
            <div className={style["content-box"]}>
              {!findDiary ? <AddDiary date={dateStr(w)} /> : <DiaryContent text={findDiary.title} title={findDiary.text} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
