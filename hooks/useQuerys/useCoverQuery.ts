import { getCoverImgUrl, selectCover } from "@/utils/supabase/sql/cover";
import { SupabaseClient } from "@supabase/supabase-js";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const coverQuerykey = ["cover"];

export const coverQueryOptions = (year: number, month: number, supabase: SupabaseClient) => ({
  queryKey: ["cover", year, month],
  queryFn: async () => {
    let url;
    const data = await selectCover(year, month, supabase);
    if (!data) {
      return null;
    } else {
      url = await getCoverImgUrl(data.path!, supabase);
    }

    return { data, url };
  },
  enabled: !!year && !!month,
});

export const useSelectCover = (year: number, month: number, supabase: SupabaseClient) => {
  return useQuery(coverQueryOptions(year, month, supabase));
};

export const fetchSelectCover = (year: number, month: number, supabase: SupabaseClient) => {
  return queryOptions(coverQueryOptions(year, month, supabase));
};
