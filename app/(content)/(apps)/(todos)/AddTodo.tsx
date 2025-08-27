"use client";

import style from "./addtodo.module.scss";
import InputBox from "../../../../components/ui/InputBox";
import Button from "../../../../components/ui/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { connect } from "react-redux";
import { add, getLocalItem, setLocalItem, ITodo } from "@/lib/store";
import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";
import { inputBlur } from "@/utils/inputBlur";
import { insertTodo } from "@/utils/supabase/todo";

interface AddTodoProps {
  addTodo: (todo: ITodo) => void;
}

function AddTodo({ addTodo }: AddTodoProps) {
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (value === "") {
      return;
    }

    const newObj = {
      id: uuidv4(),
      text: value,
      isImportant: false,
      isTime: false,
      time: "09:00",
      isComplete: false,
    };

    const existed = getLocalItem();

    addTodo(newObj);

    const updateTodo = [newObj, ...existed];
    setLocalItem(updateTodo);

    try {
      const { data, error } = await insertTodo(value);
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setValue("");
    inputBlur(e);
  };

  return (
    <form className={style["add-todo"]} onSubmit={handleSubmit}>
      <InputBox variant={"input-underline"} value={value} onChange={onChange} maxLength={15} placeholder="할일을 입력하세요" />
      <Button variant="txt-btn" existImg={false} label="완료" />
    </form>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addTodo: ({ text, id }: ITodo) => dispatch(add({ text, id })),
  };
}

export default connect(null, mapDispatchToProps)(AddTodo);
