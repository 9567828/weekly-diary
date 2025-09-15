"use client";

import { useEffect, useState } from "react";
import DiaryBox from "./(diary)/DiaryBox";
import { useAppDispatch } from "@/lib/hooks";
import { selectWeeklyDiary } from "@/lib/diary/diary.thunk";
import { dateStr, drawWeeks } from "@/components/calendar/drawWeek";
import { useParams } from "next/navigation";
import { parse } from "date-fns";

export default function Page() {
  const { getTodayWeek, weekEnd } = drawWeeks();
  const dispatch = useAppDispatch();
  // const [weekStart, setWeekStart] = useState<Date>(getTodayWeek());
  const { id } = useParams();

  const raw = Array.isArray(id) ? id[0] : id;
  const s = raw?.slice(0, 10) ?? dateStr(getTodayWeek());
  const weekStart = parse(s, "yyyy-MM-dd", new Date());

  useEffect(() => {
    dispatch(
      selectWeeklyDiary({
        weekStart: dateStr(weekStart),
        weekEnd: dateStr(weekEnd(weekStart)),
      })
    );
  }, [dispatch, weekStart]);

  // useEffect(() => {
  //   const raw = Array.isArray(id) ? id[0] : id;
  //   if (!raw) return;
  //   const s = raw.slice(0, 10);
  //   setWeekStart(parse(s, "yyyy-MM-dd", new Date()));
  // }, [id]);

  return (
    <>
      <DiaryBox weekStart={weekStart} />
    </>
  );
}
