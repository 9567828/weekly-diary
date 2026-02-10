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
  const [mounted, setMounted] = useState(false);
  const [weekStart, setWeekStart] = useState<Date>(getSunday(new Date()));
  const { date } = useParams();

  useEffect(() => {
    // if (date) {
    //   const dateFormat = parse(String(date), "yyyy-MM-dd", new Date());
    //   const sunday = getSunday(dateFormat);
    //   setWeekStart(sunday);
    // }
    setMounted(true);
    const realToday = date ? parse(String(date), "yyyy-MM-dd", new Date()) : new Date();
    setWeekStart(getSunday(realToday));
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

  if (!mounted) return null;

  return (
    <>
      <DateControl
        date={`${weekStart.getFullYear()}년 ${weekStart.getMonth() + 1}월`}
        nextBtn={moveNextWeek}
        prevBtn={movePrevWeek}
        today={() => goToday(route, "/", setWeekStart)}
      />
      <WeeklyCal date={String(date)} weekDates={weekDates(weekStart)} />
    </>
  );
}
