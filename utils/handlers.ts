import { QueryClient } from "@tanstack/react-query";
import { todoDateKey } from "@/hooks/useQuerys/useTodoQuery";
import { diaryQueryKey } from "@/hooks/useQuerys/useDiaryQuery";
import { RefObject } from "react";

type timeType = "hour" | "minute";

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
