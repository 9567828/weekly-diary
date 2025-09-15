"use client";

import { dateStr, drawWeeks } from "@/components/calendar/drawWeek";
import DateControl from "@/components/layouts/datepanel/DateControl";
import PeriodView from "@/components/period-view/PeriodView";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DiaryPanel() {
  const route = useRouter();
  const { goToday, weekEnd, getTodayWeek, getNextWeek, getPrevWeek } = drawWeeks();
  const [weekStart, setWeekStart] = useState<Date>(getTodayWeek());

  useEffect(() => {
    route.push(`/diary/${dateStr(weekStart)}-${dateStr(weekEnd(weekStart))}`);
  }, [weekStart, route, weekEnd]);

  return (
    <>
      <DateControl
        date={`${weekStart.getFullYear()}년 ${weekStart.getMonth() + 1}월`}
        nextBtn={() => getNextWeek(weekStart, setWeekStart)}
        prevBtn={() => getPrevWeek(weekStart, setWeekStart)}
        today={() => goToday(route, "/diary", setWeekStart)}
      />
      <PeriodView weekStart={weekStart} weekEnd={weekEnd(weekStart)} />
    </>
  );
}
