"use client";

import style from "../diary.module.scss";
import AddDiary from "../(add-diary)/AddDiary";
import DiaryContent from "./DiaryContent";
import { useAppSelector } from "@/lib/hooks";
import { dateStr, drawWeeks } from "@/components/calendar/drawWeek";

export default function DiaryBox({ weekStart }: { weekStart: Date }) {
  const { weekDates } = drawWeeks();

  const diaries = useAppSelector((state) => state.diaries.range);

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
              {!findDiary ? (
                <AddDiary date={dateStr(w)} />
              ) : (
                <DiaryContent id={findDiary.id} title={findDiary.title} text={findDiary.text} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
