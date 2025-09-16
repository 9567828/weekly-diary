"use client";

import DateControl from "@/components/layouts/datepanel/DateControl";
import WeeklyCal from "@/components/calendar/weekly/WeeklyCal";
import { dateStr, drawWeeks } from "@/components/calendar/drawWeek";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { parse } from "date-fns";

export default function TodoPanel() {
  const route = useRouter();
  const { weekDates, goToday, getTodayWeek, getNextWeek, getPrevWeek } = drawWeeks();
  const [weekStart, setWeekStart] = useState<Date>(getTodayWeek());
  const { date } = useParams();

  const dateFormat = parse(String(date), "yyyy-MM-dd", new Date());

  useEffect(() => {
    if (date) {
      setWeekStart(dateFormat);
    }
  }, [date]);

  const moveNextWeek = () => {
    const next = getNextWeek(weekStart);
    setWeekStart(next);
    route.push(`/${dateStr(next)}`);
  };

  const movePrevWeek = () => {
    const prev = getPrevWeek(weekStart);
    setWeekStart(prev);
    route.push(`/${dateStr(prev)}`);
  };

  return (
    <>
      <DateControl
        date={`${weekStart.getFullYear()}년 ${weekStart.getMonth() + 1}월`}
        nextBtn={moveNextWeek}
        prevBtn={movePrevWeek}
        today={() => goToday(route, "/", setWeekStart)}
      />
      <WeeklyCal weekDates={weekDates(weekStart)} />
    </>
  );
}
