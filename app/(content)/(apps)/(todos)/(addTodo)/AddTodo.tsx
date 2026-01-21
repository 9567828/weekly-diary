"use client";

import style from "./addtodo.module.scss";
import InputBox from "@/components/ui/InputBox";
import Button from "@/components/ui/Button";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useAddTodoMutation } from "@/hooks/useMutation/useTodoMutation";
import { useQueryClient } from "@tanstack/react-query";
import { todoDateKey } from "@/hooks/useQuerys/useTodoQuery";

export default function AddTodo() {
  const params = useParams<{ date?: string }>();
  const queryClient = useQueryClient();
  const { mutate } = useAddTodoMutation();
  const date = params?.date;

  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addDate = () => {
    const todayStr = format(new Date(), "yyyy-MM-dd");
    if (!date) {
      return todayStr;
    }
    return date;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === "") {
      return;
    }

    mutate(
      { text: value, todoDate: addDate() },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: todoDateKey,
          });
          setValue("");
          inputRef.current?.blur();
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <form className={style["add-todo"]} onSubmit={handleSubmit}>
      <InputBox
        ref={inputRef}
        variant={"input-underline"}
        value={value}
        onChange={onChange}
        maxLength={15}
        placeholder="할일을 입력하세요"
      />
      <Button type="submit" variant="txt-btn" existImg={false} label="완료" />
    </form>
  );
}
