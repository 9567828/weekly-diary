import { QueryClient } from "@tanstack/react-query";
import { todoDateKey } from "@/hooks/useQuerys/useTodoQuery";
import { diaryQueryKey } from "@/hooks/useQuerys/useDiaryQuery";
import { RefObject } from "react";
import { TodoWithRepeatType } from "./supabase";
import { parseDate } from "@/components/calendar/drawWeek";
import { getWeek, isLastDayOfMonth } from "date-fns";
import { coverQuerykey } from "@/hooks/useQuerys/useCoverQuery";

type timeType = "hour" | "minute";

export const DAY_LABEL = ["일", "월", "화", "수", "목", "금", "토"];

export const makeTimes = (time: timeType) => {
  let t: string[] = [];
  const num = time === "hour" ? 13 : 60;

  for (let i = 0; i <= num; ++i) {
    const h = String(i).padStart(2, "0");
    t.push(h);
  }

  if (time === "minute") {
    t.unshift("99");
  }

  return t;
};

export const handleTodoInvalidateQueries = (client: QueryClient) => {
  void client.invalidateQueries({
    queryKey: todoDateKey,
  });
};

export const handleDiaryInvalidateQueries = (client: QueryClient) => {
  void client.invalidateQueries({
    queryKey: diaryQueryKey,
  });
};

export const handleCoverInvalidateQueries = (client: QueryClient) => {
  void client.invalidateQueries({
    queryKey: coverQuerykey,
    refetchType: "active",
  });
};

let scrollTimeout: NodeJS.Timeout;
export const handleOnScroll = (fn: () => void) => {
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    // 스크롤 멈춘 뒤에만
    fn();
  }, 120);
};

export const ITEM_HEIGHT = 50;
export const DUMMY_COUNT_TOP = 1;

export const getScrollIndex = (ref: RefObject<HTMLDivElement | null>, itemArr: any[]) => {
  const el = ref.current!;

  const index = Math.round((el.scrollTop + el.clientHeight / 2) / ITEM_HEIGHT);
  const valueIndex = index - DUMMY_COUNT_TOP;

  return itemArr[valueIndex];
};

export const SITE_URL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_SITE_URL : process.env.NEXT_PUBLIC_PROD_SITE_URL;

export const isTodoVisibleOnDate = (t: TodoWithRepeatType, dateStr: string) => {
  const todoParse = parseDate(t.todo_date);
  const dateParse = parseDate(dateStr);
  let untilParse;

  if (t.done.some((d) => d.render_date === dateStr && d.is_delete === true)) {
    return false;
  }

  if (!t.is_repeat) {
    return t.todo_date === dateStr;
  }

  if (dateParse < todoParse) return false;
  if (t.repeat_until && dateParse > parseDate(t.repeat_until)) return false;

  if (t.repeat_until !== null && dateParse > parseDate(t.repeat_until)) return false;

  if (t.repeat_map?.value === "daily") return true;

  if (t.repeat_map?.value === "monthly") {
    if (t.is_month_end) {
      return isLastDayOfMonth(dateParse);
    }
    return dateParse >= todoParse && dateParse.getDate() === todoParse.getDate();
  } else {
    if (t.day_of_week?.length) {
      if (t.repeat_map?.value === "biweekly") {
        const startWeek = getWeek(todoParse);
        const currentWeek = getWeek(dateParse);
        if ((currentWeek - startWeek) % 2 !== 0) return false;
      }
      return t.day_of_week.includes(dateParse.getDay());
    }
    return false;
  }
};

export const isDoneByDate = (t: TodoWithRepeatType, dateStr: string) => t.done.some((d) => d.render_date === dateStr && d.is_done === true);

export const getExtFromMime = (file: File) => {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/svg+xml": "svg",
  };

  return map[file.type] ?? "png";
};
