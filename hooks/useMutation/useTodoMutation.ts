import { EditTodoType } from "@/utils/supabase";
import { checkDone, deleteTodo, editTodo, insertTodo } from "@/utils/supabase/sql/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoDateKey } from "../useQuerys/useTodoQuery";

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
    mutationFn: async ({ id, isDone, updated_at }: { id: string; isDone: boolean; updated_at: string }) => {
      return await checkDone(id, isDone, updated_at);
    },
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) throw new Error("id is required");
      return await deleteTodo(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoDateKey,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
