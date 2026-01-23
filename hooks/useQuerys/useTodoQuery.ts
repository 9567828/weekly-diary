import { selectTodoAll, selectTodoByDate, selectTodoByRange } from "@/utils/supabase/sql/todo";
import { useQuery } from "@tanstack/react-query";

export const todoDateKey = ["todos"];

export const useFetchTodosByRange = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["todos", startDate, endDate],
    queryFn: async () => {
      return await selectTodoByRange(startDate, endDate);
    },
  });
};

export const useFetchTodoByDate = (todoDate: string) => {
  return useQuery({
    queryKey: ["todos", "date", todoDate],
    queryFn: async () => {
      return await selectTodoByDate(todoDate);
    },
  });
};

export const useFetchTodoAll = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      return await selectTodoAll();
    },
  });
};
