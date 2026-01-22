import style from "./todo.module.scss";
import CheckBtn from "@/components/ui/checkBtn/CheckBtn";
import Button from "@/components/ui/Button";
import EditTodo from "../(editTodo)/EditTodo";
import { ChangeEvent } from "react";
import { AmPmType } from "@/utils/supabase";
import { useDeleteTodoMutation, useEditDoneMutation } from "@/hooks/useMutation/useTodoMutation";
import { useQueryClient } from "@tanstack/react-query";
import { todoDateKey } from "@/hooks/useQuerys/useTodoQuery";

interface IHandler {
  onClick: () => void;
  isOpen: boolean;
}

interface IBaseTodo {
  id: string;
  text: string;
  is_import: boolean;
  is_done: boolean;
  is_time: boolean;
  time?: string;
  is_ampm?: AmPmType;
  todo_date?: string;
}

type FullProps = IBaseTodo & IHandler;

export default function Todo(props: FullProps) {
  const { id, text, is_import, is_time, is_done, isOpen, onClick } = props;
  const queryClient = useQueryClient();
  const { mutate: editDone } = useEditDoneMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedId = e.target.id;
    const checkedState = e.target.checked;

    const targetTodo = id === checkedId;
    if (!targetTodo) return;

    editDone(
      { updated_at: new Date().toISOString(), id: checkedId, isDone: checkedState },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: todoDateKey,
          });
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <>
      <div className={`${style.position} ${is_done ? style.isDone : ""}`.trim()}>
        <div className={style.flex}>
          <CheckBtn id={id} onChange={onChange} checked={is_done}>
            <div className={style.title}>
              {is_import ? <img src="/imgs/icons/ic_important-3x.svg" alt="중요" /> : null}
              <p className={style.label}>{text}</p>
            </div>
            {is_time ? (
              <div className={style["time-line"]}>
                <img src="/imgs/icons/ic_clock.svg" alt="시간" />
                <p className={style.time}>{`${props.time} ${props.is_ampm}`}</p>
              </div>
            ) : null}
          </CheckBtn>
        </div>
        <div className={style["btn-wrap"]}>
          {!is_done ? (
            <Button existImg={true} src="/imgs/icons/ic_edit-pencel.svg" alt="투두수정" className="btn-18" onClick={onClick} />
          ) : null}
          <Button
            existImg={true}
            src="/imgs/icons/ic_delete.svg"
            alt="투두삭제"
            className="btn-18"
            onClick={() => deleteTodo(id)}
          />
        </div>
      </div>
      {isOpen ? (
        <EditTodo
          id={id}
          text={text!}
          is_import={is_import!}
          is_time={is_time!}
          time={props.time!}
          is_ampm={props.is_ampm!}
          todo_date={props.todo_date}
          onClick={onClick}
        />
      ) : null}
    </>
  );
}
