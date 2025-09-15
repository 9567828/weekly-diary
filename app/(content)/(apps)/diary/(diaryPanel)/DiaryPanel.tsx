"use client";

import { dateStr, drawWeeks } from "@/components/calendar/drawWeek";
import DateControl from "@/components/layouts/datepanel/DateControl";
import PeriodView from "@/components/period-view/PeriodView";
import { useRouter, useParams } from "next/navigation";
import { parse } from "date-fns";

export default function DiaryPanel() {
  const route = useRouter();
  const { weekEnd, getTodayWeek } = drawWeeks();
  const { id } = useParams();

  const raw = Array.isArray(id) ? id[0] : id;
  const s = raw?.slice(0, 10) ?? dateStr(getTodayWeek());
  const weekStart = parse(s, "yyyy-MM-dd", new Date());

  const moveNextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7); // 일주일 뒤
    route.push(`/diary/${dateStr(d)}-${dateStr(weekEnd(d))}`);
  };

  const movePrevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7); // 일주일 전
    route.push(`/diary/${dateStr(d)}-${dateStr(weekEnd(d))}`);
  };

  const goToday = () => {
    const todayStart = getTodayWeek();
    route.push("/diary");
  };

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
