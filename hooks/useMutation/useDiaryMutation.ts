import { AddDiaryType, EditDiaryType } from "@/utils/supabase";
import { addDiary, deleteDiary, updateDiary } from "@/utils/supabase/sql/diary";
import { useMutation } from "@tanstack/react-query";

export const useAddDiaryMutation = () => {
  return useMutation({
    mutationFn: async (props: AddDiaryType) => {
      return await addDiary(props);
    },
  });
};

export const useEditDiaryMutation = () => {
  return useMutation({
    mutationFn: async (props: EditDiaryType) => {
      return await updateDiary(props);
    },
  });
};

export const useDeleteDiaryMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteDiary(id);
    },
  });
};
