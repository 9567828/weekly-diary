"use client";

import style from "./addtodo.module.scss";
import InputBox from "../../../../components/ui/InputBox";
import Button from "../../../../components/ui/Button";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { addTodoThunk } from "@/lib/todos/todo.thunk";
import { useAppDispatch } from "@/lib/hooks";
import { useParams, usePathname } from "next/navigation";
import { format } from "date-fns";

export default function AddTodo() {
  const params = useParams<{ date?: string }>();
  const date = params?.date;
  const path = usePathname();

  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

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

    dispatch(addTodoThunk({ text: value, todoDate: addDate() }));

    setValue("");
    inputRef.current?.blur();
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
