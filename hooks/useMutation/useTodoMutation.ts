import { EditTodoCheck, EditTodoType } from "@/utils/supabase";
import { checkDoneTable, deleteTodo, editTodo, insertTodo } from "@/utils/supabase/sql/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoDateKey } from "../useQuerys/useTodoQuery";
import { handleTodoInvalidateQueries } from "@/utils/handlers";

export const useAddTodoMutation = () => {
  return useMutation({
    mutationFn: async ({ text, todoDate }: { text: string; todoDate: string }) => {
      return await insertTodo(text, todoDate);
    },
  });
};

export const useEditTodoMutation = () => {
  return useMutation({
    mutationFn: async (props: EditTodoType) => {
      return await editTodo(props);
    },
  });
};

export const useEditDoneMutation = () => {
  return useMutation({
    mutationFn: async (props: EditTodoCheck) => {
      return await checkDoneTable(props);
    },
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, render_date, isAll, isRepeat }: { id: string; render_date: string; isAll: boolean; isRepeat: boolean }) => {
      if (!id) throw new Error("id is required");
      return await deleteTodo(id, render_date, isAll, isRepeat);
    },
    onSuccess: () => {
      handleTodoInvalidateQueries(queryClient);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
