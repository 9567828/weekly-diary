import { deleteCover } from "@/utils/supabase/sql/cover";
import { useMutation } from "@tanstack/react-query";

export const useUpsertCoverMutation = () => {
  return useMutation({
    mutationFn: async ({ year, month, file }: { year: number; month: number; file: File }) => {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("year", String(year));
      formData.append("month", String(month));

      const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/add-cover`, { method: "POST", body: formData });

      return await req.json();
    },
  });
};

export const useDeleteCoverMutation = () => {
  return useMutation({
    mutationFn: async ({ year, month, path }: { year: number; month: number; path: string }) => {
      return await deleteCover(year, month, path);
    },
  });
};
