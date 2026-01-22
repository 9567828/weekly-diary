"use client";

import DateControl from "@/components/layouts/datepanel/DateControl";
import MonthlyCal from "@/components/calendar/monthly/MonthlyCal";
import { useState } from "react";
import { drawMonth, handleNextMonth, handlePrevMonth } from "@/components/calendar/drawWeek";
import { useRouter } from "next/navigation";
import { isMobileDevice } from "@/utils/handlers";
import { isMobile, MobileView } from "react-device-detect";
import { useIsMobile } from "@/hooks/useHooks";

export default function CalendarPanel() {
  const route = useRouter();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const { allWeeks } = drawMonth(year, month);
  const isMobile = useIsMobile();

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    route.push("/calendar");
  };

  return (
    <>
      <div style={{ width: "100%", height: isMobile ? "235px" : "580px" }}>
        <img src="/imgs/9a0695874aa43634410880271871cf2a.jpg" alt="사진" style={{ width: "100%", height: "100%" }} />
      </div>
      <div style={{ padding: "20px" }}>
        <DateControl
          date={`${year}년 ${month + 1}월`}
          nextBtn={() => {
            const { year: nextYear, month: nextMonth } = handleNextMonth(year, month);
            setYear(nextYear);
            setMonth(nextMonth);
          }}
          prevBtn={() => {
            const { year: prevYear, month: prevMonth } = handlePrevMonth(year, month);
            setYear(prevYear);
            setMonth(prevMonth);
          }}
          today={goToday}
        />
        <MonthlyCal allWeeks={allWeeks} currYear={year} currMonth={month + 1} />
      </div>
    </>
  );
}
