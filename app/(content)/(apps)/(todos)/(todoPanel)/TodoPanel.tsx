"use client";

import DateControl from "@/components/layouts/datepanel/DateControl";
import WeeklyCal from "@/components/calendar/weekly/WeeklyCal";
import { dateStr, drawWeeks } from "@/components/calendar/drawWeek";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { parse } from "date-fns";

const getSunday = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return d;
};

export default function TodoPanel() {
  const route = useRouter();
  const { weekDates, goToday, getNextWeek, getPrevWeek } = drawWeeks();
  const [weekStart, setWeekStart] = useState<Date>(getSunday(new Date()));
  const { date } = useParams();

  useEffect(() => {
    if (date) {
      const dateFormat = parse(String(date), "yyyy-MM-dd", new Date());
      const sunday = getSunday(dateFormat);
      setWeekStart(sunday);
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
      <WeeklyCal key={dateStr(new Date())} weekDates={weekDates(weekStart)} />
    </>
  );
}
