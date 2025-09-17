import style from "./todo.module.scss";
import CheckBtn from "@/components/ui/checkBtn/CheckBtn";
import Button from "@/components/ui/Button";
import EditTodo from "../(editTodo)/EditTodo";
import { ChangeEvent } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { checkDoneThunk, deleteTodoThunk } from "@/lib/todos/todo.thunk";

interface IHandler {
  onClick: () => void;
  isOpen: boolean;
}

interface IBaseTodo {
  id: string;
  text: string;
  isImport: boolean;
  isDone: boolean;
  isTime: boolean;
  time?: string;
  isAmpm?: string;
  todoDate?: string;
}

type FullProps = IBaseTodo & IHandler;

export default function Todo(props: FullProps) {
  const { id, text, isImport, isTime, isDone, isOpen, onClick } = props;
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedId = e.target.id;
    const checkedState = e.target.checked;

    const targetTodo = id === checkedId;
    if (!targetTodo) return;

    dispatch(checkDoneThunk({ id: checkedId, isDone: checkedState }));
  };

  return (
    <>
      <div className={`${style.position} ${isDone ? style.isDone : ""}`.trim()}>
        <div className={style.flex}>
          <CheckBtn id={id} onChange={onChange} checked={isDone}>
            <div className={style.title}>
              {isImport ? <img src="/imgs/icons/ic_important-3x.svg" alt="중요" /> : null}
              <p className={style["label"]}>{text}</p>
            </div>
            {isTime ? (
              <div className={style["time-line"]}>
                <img src="/imgs/icons/ic_clock.svg" alt="시간" />
                <p className={style.time}>{props.time}</p>
              </div>
            ) : null}
          </CheckBtn>
        </div>
        <div className={style["btn-wrap"]}>
          {!isDone ? (
            <Button existImg={true} src="/imgs/icons/ic_edit-pencel.svg" alt="투두수정" className="btn-18" onClick={onClick} />
          ) : null}
          <Button
            existImg={true}
            src="/imgs/icons/ic_delete.svg"
            alt="투두삭제"
            className="btn-18"
            onClick={() => dispatch(deleteTodoThunk(id))}
          />
        </div>
      </div>
      {isOpen ? (
        <EditTodo
          id={id}
          text={text}
          isImport={isImport}
          isTime={isTime}
          time={props.time}
          isAmpm={props.isAmpm}
          todoDate={props.todoDate}
          onClick={onClick}
        />
      ) : null}
    </>
  );
}
