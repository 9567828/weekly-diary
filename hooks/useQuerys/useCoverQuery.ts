import { getCoverImgUrl, selectCover } from "@/utils/supabase/sql/cover";
import { useQuery } from "@tanstack/react-query";

export const useSelectCover = (year: number, month: number) => {
  return useQuery({
    queryKey: ["cover", year, month],
    queryFn: async () => {
      let url;
      const data = await selectCover(year, month);
      if (!data) {
        return null;
      } else {
        url = await getCoverImgUrl(data.path!);
      }

      return { data, url };
    },
    enabled: !!year && !!month,
  });
};
