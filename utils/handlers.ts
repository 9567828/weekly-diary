import { QueryClient } from "@tanstack/react-query";
import { todoDateKey } from "@/hooks/useQuerys/useTodoQuery";
import { diaryQueryKey } from "@/hooks/useQuerys/useDiaryQuery";
import { Dispatch, Ref, RefObject, SetStateAction } from "react";
import { TodoWithRepeatType } from "./supabase";
import { parseDate } from "@/components/calendar/drawWeek";
import { getWeek, isLastDayOfMonth } from "date-fns";
import { coverQuerykey } from "@/hooks/useQuerys/useCoverQuery";

type timeType = "hour" | "minute";

export const DAY_LABEL = ["일", "월", "화", "수", "목", "금", "토"];

export const makeTimes = (time: timeType) => {
  let t: string[] = [];
  const num = time === "hour" ? 12 : 59;
  let i = time === "hour" ? 1 : 0;

  for (i; i <= num; ++i) {
    const h = String(i).padStart(2, "0");
    t.push(h);
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
  }, 130);
};

export const ITEM_HEIGHT = 50;
export const DUMMY_COUNT_TOP = 1;

export const getScrollIndex = (ref: RefObject<HTMLDivElement | null>, itemArr: any[], lastIndex: RefObject<number>, isAndroid: boolean) => {
  // const el = ref.current!;
  // const scrollTop = el.scrollTop;

  // const index = Math.round((scrollTop + el.clientHeight / 2) / ITEM_HEIGHT);
  // const valueIndex = index - DUMMY_COUNT_TOP;

  // const safeIndex = Math.max(0, Math.min(valueIndex, itemArr.length - 1));

  // return itemArr[safeIndex];

  const el = ref.current;
  if (!el) return;

  const centerY = el.scrollTop + el.clientHeight / 2;

  const index = getStableIndex(centerY, lastIndex, isAndroid);

  const valueIndex = index - DUMMY_COUNT_TOP;

  const safeIndex = Math.max(0, Math.min(valueIndex, itemArr.length - 1));

  console.log(safeIndex);

  return itemArr[safeIndex];
};

export const getStableIndex = (centerY: number, lastIndexRef: RefObject<number>, isAndroid: boolean) => {
  const OFFSET = DUMMY_COUNT_TOP * ITEM_HEIGHT;

  // const rawIndex = (centerY - OFFSET) / ITEM_HEIGHT;
  const rawIndex = centerY / ITEM_HEIGHT;

  if (isAndroid) {
    const diff = rawIndex - lastIndexRef.current;
    if (Math.abs(diff) < 0.2) {
      return lastIndexRef.current ?? 0;
    }
  }

  // const idx = Math.round(rawIndex);
  const idx = Number(rawIndex.toFixed());
  lastIndexRef.current = idx;

  return idx;
};

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
