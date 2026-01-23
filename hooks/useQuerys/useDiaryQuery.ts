import { selectDiaryByDate, selectDiaryByRange } from "@/utils/supabase/sql/diary";
import { useQuery } from "@tanstack/react-query";

export const diaryQueryKey = ["diary"];

export const useFetchDiaryByDate = (date: string) => {
  return useQuery({
    queryKey: ["diary", date],
    queryFn: async () => {
      return await selectDiaryByDate(date);
    },
  });
};

export const useFetchDiaryByRange = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["diary", { startDate, endDate }],
    queryFn: async () => {
      return await selectDiaryByRange(startDate, endDate);
    },
  });
};
