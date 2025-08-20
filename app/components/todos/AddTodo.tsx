"use client";

import style from "../../../styles/components/todos/addtodo.module.scss";
import InputBox from "../ui/InputBox";
import Button from "../ui/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { connect } from "react-redux";
import { add, getLocalItem, setLocalItem, ITodo } from "@/lib/store";
import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";

interface AddTodoProps {
  addTodo: (todo: ITodo) => void;
}

function AddTodo({ addTodo }: AddTodoProps) {
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent) => {
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

    setValue("");
  };

  return (
    <form className={style["add-todo"]} onSubmit={handleSubmit}>
      <InputBox value={value} onChange={onChange} placeholder="할일을 입력하세요" />
      <Button isTxtBtn={true} existImg={false} label="완료" />
    </form>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addTodo: ({ text, id }: ITodo) => dispatch(add({ text, id })),
  };
}

export default connect(null, mapDispatchToProps)(AddTodo);
