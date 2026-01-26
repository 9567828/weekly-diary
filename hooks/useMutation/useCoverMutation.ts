import { AddCoverType } from "@/utils/supabase";
import { insertCover, saveCoverImg } from "@/utils/supabase/sql/cover";
import { useMutation } from "@tanstack/react-query";

export const useAddCoverMutation = () => {
  return useMutation({
    mutationFn: async ({ year, month, file }: { year: number; month: number; file: File }) => {
      const {
        id,
        data: { id: storage_id, path },
      } = await saveCoverImg({ year, month, file });

      const newObj: AddCoverType = {
        year,
        month,
        path,
        storage_id,
        user_id: id!,
      };

      return await insertCover(newObj);
    },
  });
};
