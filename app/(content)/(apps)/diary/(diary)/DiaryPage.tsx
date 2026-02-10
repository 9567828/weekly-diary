"use client";

import style from "../diary.module.scss";
import { dateStr, drawWeeks, makeWeekNum, today } from "@/components/calendar/drawWeek";
import { useParams } from "next/navigation";
import { addDays, parse } from "date-fns";
import { useFetchDiaryByRange } from "@/hooks/useQuerys/useDiaryQuery";
import AddDiary from "../(add-diary)/AddDiary";
import DiaryContent from "./DiaryContent";
import EmptySpace from "@/components/ui/EmptySpace";
import { DAY_LABEL } from "@/utils/handlers";
import { DiaryRow } from "@/utils/supabase";

export default function DiaryPage() {
  const { getTodayWeek, weekEnd } = drawWeeks();
  const { id } = useParams();

  const raw = Array.isArray(id) ? id[0] : id;
  const s = raw ?? dateStr(getTodayWeek());
  const weekStart = parse(s, "yyyy-MM-dd", new Date());

  const { weekDates } = drawWeeks();
  const startStr = dateStr(weekStart);
  const endDate = addDays(weekEnd(weekStart), 1);
  const endStr = dateStr(endDate);
  const { data, error, isError, isFetching } = useFetchDiaryByRange<DiaryRow>(startStr, endStr, "*");

  const safeData = isFetching ? [] : data;

  if (isError) {
    console.log(error.message);
  }

  return (
    <>
      <div className={style["diary-list"]}>
        {weekDates(weekStart).map((w, i) => {
          const list = dateStr(w);
          const dateNum = w.getDate();
          const weekNum = makeWeekNum(w);
          const day = w.getDay();
          const findDiary = safeData?.find((d) => d.diary_date === list);

          return (
            <div key={i} className={style["diary-container"]} id={dateStr(w)} data-date={dateStr(w)}>
              <div className={style["date-box"]}>
                <p className={`${style.date} ${day === 0 || day === 6 ? style.weekend : ""} ${dateStr(today()) === list ? style.today : ""}`.trim()}>{`${dateNum}일`}</p>
                <p className={style.day}>{`${DAY_LABEL[day]}요일`}</p>
              </div>
              <div className={style["content-box"]}>
                {!findDiary ? <AddDiary date={dateStr(w)} weekNum={weekNum} /> : <DiaryContent id={findDiary.id} title={findDiary.title!} text={findDiary.text!} />}
              </div>
            </div>
          );
        })}
      </div>
      <EmptySpace />
    </>
  );
}
