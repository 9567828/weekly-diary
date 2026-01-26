import { format, getWeek, parse } from "date-fns";
import { Dispatch, SetStateAction } from "react";

export const today = () => new Date();
export const todayStr = () => format(today(), "yyyy-MM-dd");
export const dateStr = (d: Date) => format(d, "yyyy-MM-dd");
export const parseDate = (d: string) => parse(d, "yyyy-MM-dd", new Date());
export const makeWeekNum = (d: Date) => getWeek(d, { weekStartsOn: 0 });

export const drawWeeks = () => {
  const dayOfWeek = today().getDay();

  const weekStart = () => {
    const s = new Date(today());
    s.setDate(today().getDate() - dayOfWeek);
    return s;
  };

  const getWeekStart = () => {
    const s = new Date(today());
    const dow = s.getDay();
    s.setDate(s.getDate() - dow);
    return s;
  };

  const getWeekStartFormatStr = (date: Date) => {
    const s = new Date(date);
    const dow = s.getDay();
    s.setDate(s.getDate() - dow);
    const str = dateStr(s);
    return str;
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

  const getNextWeek = (weekStart: Date) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    return d;
  };
  const getPrevWeek = (weekStart: Date) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    return d;
  };

  const goToday = (route: any, path: string, setState: Dispatch<SetStateAction<Date>>) => {
    setState(getTodayWeek());
    route.push(path);
  };

  return { weekStart, weekEnd, getTodayWeek, weekDates, getNextWeek, getPrevWeek, goToday, getWeekStartFormatStr };
};

export const drawMonth = (year: number, month: number) => {
  const firstDate = new Date(year, month, 1);
  const startDay = new Date(firstDate);
  startDay.setDate(1 - firstDate.getDay());

  const lastDate = new Date(year, month + 1, 0);
  const lastDay = new Date(lastDate);
  lastDay.setDate(lastDate.getDate() + (6 - lastDate.getDay()));

  let currWeeks: Date[] = [];
  let allWeeks: Date[][] = [];
  const curDate = new Date(startDay);

  while (curDate <= lastDay) {
    const newDate = new Date(curDate);
    currWeeks.push(newDate);
    if (currWeeks.length === 7) {
      allWeeks.push(currWeeks);
      currWeeks = [];
    }
    curDate.setDate(curDate.getDate() + 1);
  }

  return { year, month, firstDate, lastDate, allWeeks };
};

export const handlePrevMonth = (year: number, month: number) => {
  const d = new Date(year, month - 1, 1);

  return { year: d.getFullYear(), month: d.getMonth() };
};

export const handleNextMonth = (year: number, month: number) => {
  const d = new Date(year, month + 1, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
};
