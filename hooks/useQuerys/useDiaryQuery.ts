import { selectDiaryByDate, selectDiaryByRange } from "@/utils/supabase/sql/diary";
import { QueryClient, useQuery } from "@tanstack/react-query";

export const diaryQueryKey = ["diary"];

export const useFetchDiaryByDate = (date: string) => {
  return useQuery({
    queryKey: ["diary", date],
    queryFn: async () => {
      return await selectDiaryByDate(date);
    },
  });
};

const fetchDiaryByRangeOptions = <T>(startDate: string, endDate: string, select: "*" | "diary_date") => ({
  queryKey: ["diary", { startDate, endDate }],
  queryFn: async () => {
    return await selectDiaryByRange<T>(startDate, endDate, select);
  },
  staleTime: 1000 * 30, // 30초~1분
  cacheTime: 1000 * 60 * 10, // 10분
  keepPreviousData: true,
});

export const useFetchDiaryByRange = <T>(startDate: string, endDate: string, select: "*" | "diary_date") => {
  return useQuery(fetchDiaryByRangeOptions<T>(startDate, endDate, select));
};

export const preFetchDiaryByRange = <T>(startDate: string, endDate: string, select: "*" | "diary_date", queryClient: QueryClient) => {
  return queryClient.prefetchQuery(fetchDiaryByRangeOptions<T>(startDate, endDate, select));
};
