"use client";

import DateControl from "@/components/layouts/datepanel/DateControl";
import MonthlyCal from "@/components/calendar/monthly/MonthlyCal";
import { useEffect, useState } from "react";
import { drawMonth } from "@/components/calendar/drawWeek";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { setWeekCount } from "@/lib/diary/diarySlice";

export default function CalendarPanel() {
  const route = useRouter();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const dispatch = useAppDispatch();
  const { allWeeks } = drawMonth(year, month);

  useEffect(() => {
    dispatch(setWeekCount(allWeeks.length));
  }, [allWeeks, dispatch]);

  const handlePrevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    const prevYear = prev.getFullYear();
    const prevMonth = prev.getMonth();

    setYear(prevYear);
    setMonth(prevMonth);

    route.push(`/calendar/${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-01`);
  };

  const handleNextMonth = () => {
    const next = new Date(year, month + 1, 1);
    const nextYear = next.getFullYear();
    const nextMonth = next.getMonth();

    setYear(nextYear);
    setMonth(nextMonth);

    route.push(`/calendar/${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-01`);
  };

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    route.push("/calendar");
  };

  return (
    <>
      <DateControl date={`${year}년 ${month + 1}월`} nextBtn={handleNextMonth} prevBtn={handlePrevMonth} today={goToday} />
      <MonthlyCal allWeeks={allWeeks} currYear={year} currMonth={month + 1} />
    </>
  );
}
