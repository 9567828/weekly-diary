"use client";

import style from "../../../styles/components/todos/addtodo.module.scss";
import InputBox from "../ui/InputBox";
import Button from "../ui/Button";
import { FormEvent } from "react";

export default function AddTodo() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form className={style["add-todo"]} onSubmit={handleSubmit}>
      <InputBox placeholder="할일을 입력하세요" />
      <Button isTxtBtn={true} existImg={false} label="완료" />
    </form>
  );
}
