import { createClient } from "@/utils/supabase/service/client";
import { selectCover } from "@/utils/supabase/sql/cover";
import { SupabaseClient } from "@supabase/supabase-js";
import { QueryClient, queryOptions, useQuery } from "@tanstack/react-query";

export const coverQuerykey = ["cover"];

export const coverQueryOptions = (year: number, month: number) => ({
  queryKey: ["cover", year, month],
  queryFn: async () => {
    const supabase = createClient();
    const data = await selectCover(year, month, supabase);

    if (!data) return null;

    return data;
  },
  staleTime: 1000 * 60 * 5,
  keepPreviousData: true,
});

export const useSelectCover = (year: number, month: number) => {
  return useQuery(coverQueryOptions(year, month));
};

export const fetchSelectCover = (year: number, month: number, queryClient: QueryClient) => {
  return queryClient.prefetchQuery(coverQueryOptions(year, month));
};
