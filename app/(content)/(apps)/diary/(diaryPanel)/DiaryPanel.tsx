"use client";

import { dateStr, drawWeeks } from "@/components/calendar/drawWeek";
import DateControl from "@/components/layouts/datepanel/DateControl";
import PeriodView from "@/components/period-view/PeriodView";
import { useParams, useRouter } from "next/navigation";
import { getWeek, parse } from "date-fns";
import { useEffect, useState } from "react";

export default function DiaryPanel() {
  const route = useRouter();
  const params = useParams();
  const { weekEnd, getTodayWeek } = drawWeeks();
  const [weekStart, setWeekStart] = useState<Date>(getTodayWeek());
  // const [weekNum, setWeekNum] = useState(getWeek(getTodayWeek(), { weekStartsOn: 0 }));

  const moveNextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
    route.push(`/diary/${dateStr(d)}`);
  };

  const movePrevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
    route.push(`/diary/${dateStr(d)}`);
  };

  const goToday = () => {
    const todayStart = getTodayWeek();
    setWeekStart(todayStart);
    route.push("/diary");
  };

  useEffect(() => {
    if (params.id) {
      setWeekStart(parse(String(params.id), "yyyy-MM-dd", new Date()));
    }
  }, [params.id]);

  // useEffect(() => {
  //   setWeekNum(getWeek(weekStart, { weekStartsOn: 0 }));
  // }, [weekStart]);

  return (
    <>
      <DateControl
        date={`${weekStart.getFullYear()}년 ${weekStart.getMonth() + 1}월`}
        nextBtn={moveNextWeek}
        prevBtn={movePrevWeek}
        today={goToday}
      />
      <PeriodView weekStart={weekStart} weekEnd={weekEnd(weekStart)} />
    </>
  );
}
