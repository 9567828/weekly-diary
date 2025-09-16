"use client";

import DateControl from "@/components/layouts/datepanel/DateControl";
import MonthlyCal from "@/components/calendar/monthly/MonthlyCal";
import { useState } from "react";
import { drawMonth } from "@/components/calendar/drawWeek";

export default function CalendarPanel() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0=1월, 11=12월

  const { allWeeks } = drawMonth(year, month);

  // ✅ 이전 달
  const handlePrevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    setYear(prev.getFullYear());
    setMonth(prev.getMonth());
  };

  // ✅ 다음 달
  const handleNextMonth = () => {
    const next = new Date(year, month + 1, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };

  // ✅ 오늘
  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  return (
    <>
      <DateControl date={`${year}년 ${month + 1}월`} nextBtn={handleNextMonth} prevBtn={handlePrevMonth} today={goToday} />
      <MonthlyCal allWeeks={allWeeks} />
    </>
  );
}
