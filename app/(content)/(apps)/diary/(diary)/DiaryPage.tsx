"use client";

import { useEffect } from "react";
import DiaryBox from "./DiaryBox";
import { useAppDispatch } from "@/lib/hooks";
import { selectWeeklyDiary } from "@/lib/diary/diary.thunk";
import { dateStr, drawWeeks, makeWeekNum } from "@/components/calendar/drawWeek";
import { useParams } from "next/navigation";
import { parse } from "date-fns";

export default function DiaryPage() {
  const { getTodayWeek, weekEnd } = drawWeeks();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const raw = Array.isArray(id) ? id[0] : id;
  const s = raw ?? dateStr(getTodayWeek());
  const weekStart = parse(s, "yyyy-MM-dd", new Date());

  // const n = raw?.slice(0, 2) ?? makeWeekNum(getTodayWeek());
  // const weekNum = Number(n);

  useEffect(() => {
    dispatch(selectWeeklyDiary({ weekStart: dateStr(weekStart), weekEnd: dateStr(weekEnd(weekStart)) }));
  }, [dispatch, weekStart]);

  return (
    <>
      <DiaryBox weekStart={weekStart} />
    </>
  );
}
