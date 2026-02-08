import { deleteCover } from "@/utils/supabase/sql/cover";
import { useMutation } from "@tanstack/react-query";

export const useUpsertCoverMutation = () => {
  return useMutation({
    mutationFn: async ({ year, month, originFile, croppedFile }: { year: number; month: number; originFile: File; croppedFile: File }) => {
      let formData = new FormData();
      formData.append("originFile", originFile);
      formData.append("croppedFile", croppedFile);
      formData.append("year", String(year));
      formData.append("month", String(month));

      const req = await fetch(`/api/add-cover`, { method: "POST", body: formData });

      if (!req.ok) {
        const text = await req.text();
        throw new Error(text || "server error");
      }

      return await req.json();
    },
  });
};

export const useDeleteCoverMutation = () => {
  return useMutation({
    mutationFn: async ({ path }: { path: string }) => {
      return await deleteCover(path);
    },
  });
};
