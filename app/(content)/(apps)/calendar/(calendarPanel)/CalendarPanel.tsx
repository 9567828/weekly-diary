"use client";

import style from "./calendar.module.scss";
import DateControl from "@/components/layouts/datepanel/DateControl";
import MonthlyCal from "@/components/calendar/monthly/MonthlyCal";
import { useState } from "react";
import { drawMonth, handleNextMonth, handlePrevMonth } from "@/components/calendar/drawWeek";
import { useRouter } from "next/navigation";
import EmptySpace from "@/components/ui/EmptySpace";
import CalendarCover from "./CalendarCover";

export default function CalendarPanel() {
  const route = useRouter();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const { allWeeks } = drawMonth(year, month);

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    route.push("/calendar");
  };

  return (
    <>
      <CalendarCover year={year} month={month} />
      <div>
        <div className={style.month}>
          <DateControl
            isMargin
            date={`${year}년 ${month + 1}월`}
            nextBtn={() => {
              const { year: nextYear, month: nextMonth } = handleNextMonth(year, month);
              setYear(nextYear);
              setMonth(nextMonth);
              route.push(`/calendar?year=${nextYear}&month=${nextMonth + 1}`);
            }}
            prevBtn={() => {
              const { year: prevYear, month: prevMonth } = handlePrevMonth(year, month);
              setYear(prevYear);
              setMonth(prevMonth);
              route.push(`/calendar?year=${prevYear}&month=${prevMonth + 1}`);
            }}
            today={goToday}
          />
          <MonthlyCal allWeeks={allWeeks} currYear={year} currMonth={month + 1} />
        </div>
        <EmptySpace isCalendar />
      </div>
    </>
  );
}
