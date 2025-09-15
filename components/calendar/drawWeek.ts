import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

export const today = () => new Date();
export const todayStr = () => format(today(), "yyyy-MM-dd");
export const dateStr = (d: Date) => format(d, "yyyy-MM-dd");

export const drawWeeks = () => {
  const dayOfWeek = today().getDay();

  const weekStart = () => {
    const s = new Date(today());
    s.setDate(today().getDate() - dayOfWeek);
    return s;
  };

  const weekEnd = (weekStart: Date): Date => {
    const e = new Date(weekStart);
    e.setDate(weekStart.getDate() + 6);
    return e;
  };

  const getTodayWeek = () => {
    const t = today();
    const sunday = new Date(t);
    sunday.setDate(t.getDate() - t.getDay());
    return sunday;
  };

  const weekDates = (weekStart: Date) => {
    const ws = weekStart;
    let date = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(ws);
      d.setDate(ws.getDate() + i);
      date.push(d);
    }

    return date;
  };

  const getNextWeek = (weekStart: Date, setState: Dispatch<SetStateAction<Date>>) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setState(d);
  };
  const getPrevWeek = (weekStart: Date, setState: Dispatch<SetStateAction<Date>>) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setState(d);
  };

  const goToday = (route: any, path: string, setState: Dispatch<SetStateAction<Date>>) => {
    setState(getTodayWeek());
    route.push(path);
  };

  return { weekStart, weekEnd, getTodayWeek, weekDates, getNextWeek, getPrevWeek, goToday };
};

export const drowMonth = () => {
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth();

  const firstDate = new Date(curYear, curMonth, 1);
  const startDay = new Date(firstDate);
  const firstNum = firstDate.getDay();
  startDay.setDate(1 - firstDate.getDay());

  const lastDate = new Date(curYear, curMonth + 1, 0); // 다음 달로 넘어가서 마지막 날 구하기
  const lastDay = new Date(lastDate);
  const lastNum = lastDate.getDate();

  lastDay.setDate(lastDate.getDate() + (6 - lastDate.getDay()));

  let currWeeks = [];
  let allWeeks = [];
  const curDate = new Date(startDay);

  return { firstDate };
};
