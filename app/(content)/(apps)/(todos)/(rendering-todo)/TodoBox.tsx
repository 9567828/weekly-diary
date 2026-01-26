import style from "./todo.module.scss";
import CheckBtn from "@/components/ui/checkBtn/CheckBtn";
import Button from "@/components/ui/Button";
import EditTodo from "../(editTodo)/EditTodo";
import { ChangeEvent } from "react";
import { AmPmType, RepeatMapType, RepeatType } from "@/utils/supabase";
import { useDeleteTodoMutation, useEditDoneMutation } from "@/hooks/useMutation/useTodoMutation";
import { useQueryClient } from "@tanstack/react-query";
import { DAY_LABEL, handleTodoInvalidateQueries } from "@/utils/handlers";
import MetaText from "./MetaText";

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
  is_month_end: boolean;
  day_of_week: number[] | null;
  repeat_until: string | null;
  repeat_map: RepeatMapType;
}

type FullProps = IBaseTodo & IHandler;

export default function Todo(props: FullProps) {
  const { id, text, is_import, is_time, is_done, isOpen, onClick, repeat_map, repeat_until, day_of_week, is_month_end } = props;
  let repeatLable;
  if (repeat_map) {
    repeatLable = `${repeat_map.value === "biweekly" ? "격주 · " : repeat_map.value === "weekly" ? `${repeat_map.label} · ` : repeat_map.label} ${repeat_until !== null ? `· ${repeat_until} 까지` : ""} ${is_month_end ? "· 말일" : ""}`;
  }
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
          handleTodoInvalidateQueries(queryClient);
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
            {is_time && <MetaText icon="ic_clock" alt="시간" text={`${props.is_ampm} ${props.time}`} />}
            {repeat_map !== null && repeat_map.label !== "안함" && (
              <div className={style["repeat-wrap"]}>
                <MetaText icon="ic_repeat-small" alt="반복" text={repeatLable!} />
                {(repeat_map.value === "biweekly" || repeat_map.value === "weekly") &&
                  day_of_week?.map((d) => {
                    return (
                      <div key={d} className={style["days-txt"]}>
                        <p>{DAY_LABEL[d]}</p>
                      </div>
                    );
                  })}
              </div>
            )}
          </CheckBtn>
        </div>
        <div className={style["btn-wrap"]}>
          {!is_done ? <Button existImg={true} src="/imgs/icons/ic_edit-pencel.svg" alt="투두수정" className="btn-18" onClick={onClick} /> : null}
          <Button existImg={true} src="/imgs/icons/ic_delete.svg" alt="투두삭제" className="btn-18" onClick={() => deleteTodo(id)} />
        </div>
      </div>
      {isOpen && (
        <EditTodo
          id={id}
          text={text!}
          is_import={is_import!}
          is_time={is_time!}
          time={props.time!}
          is_ampm={props.is_ampm!}
          todo_date={props.todo_date}
          is_month_end={props.is_month_end}
          repeat_map={props.repeat_map}
          day_of_week={props.day_of_week!}
          repeat_until={props.repeat_until}
          onClose={onClick}
        />
      )}
    </>
  );
}
