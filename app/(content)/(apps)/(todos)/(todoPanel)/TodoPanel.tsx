"use client";

import DateControl from "@/components/layouts/datepanel/DateControl";
import WeeklyCal from "@/components/calendar/weekly/WeeklyCal";
import { drawWeeks } from "@/components/calendar/drawWeek";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoPanel() {
  const route = useRouter();
  const { weekDates, goToday, getTodayWeek, getNextWeek, getPrevWeek } = drawWeeks();
  const [weekStart, setWeekStart] = useState<Date>(getTodayWeek());
  return (
    <>
      <DateControl
        date={`${weekStart.getFullYear()}년 ${weekStart.getMonth() + 1}월`}
        nextBtn={() => getNextWeek(weekStart, setWeekStart)}
        prevBtn={() => getPrevWeek(weekStart, setWeekStart)}
        today={() => goToday(route, "/", setWeekStart)}
      />
      <WeeklyCal weekDates={weekDates(weekStart)} />
    </>
  );
}
