"use client";

import style from "./datepanel.module.scss";
import DateControl from "./DateControl";
import { useParams, usePathname, useRouter } from "next/navigation";
import Calendar from "@/components/calendar/Calendar";
import { useState } from "react";

const getTodayWeek = () => {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());
  return sunday;
};

export default function DatePanel() {
  const path = usePathname();
  const { date } = useParams();
  const route = useRouter();
  const [weekStart, setWeekStart] = useState<Date>(getTodayWeek);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const goToday = () => {
    setWeekStart(getTodayWeek());
    route.push("/");
  };
  const getNextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };
  const getPrevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };

  return (
    <div className={style.panel}>
      <DateControl
        date={`${weekStart.getFullYear()}년 ${weekStart.getMonth() + 1}월`}
        nextBtn={getNextWeek}
        prevBtn={getPrevWeek}
        today={goToday}
      />
      {path === "/" || path === `/${date}` ? <Calendar weekDates={weekDates} /> : <h1>다른놈</h1>}
    </div>
  );
}
