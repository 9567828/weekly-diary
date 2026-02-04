import style from "./todo.module.scss";
import CheckBtn from "@/components/ui/checkBtn/CheckBtn";
import Button from "@/components/ui/Button";
import EditTodo from "../(editTodo)/EditTodo";
import { ChangeEvent, useState } from "react";
import { EditTodoCheck, TodoWithRepeatType } from "@/utils/supabase";
import { useDeleteTodoMutation, useEditDoneMutation } from "@/hooks/useMutation/useTodoMutation";
import { useQueryClient } from "@tanstack/react-query";
import { DAY_LABEL, handleTodoInvalidateQueries } from "@/utils/handlers";
import MetaText from "./MetaText";
import { useParams } from "next/navigation";
import { todayStr } from "@/components/calendar/drawWeek";
import ConfirmModal from "@/components/ui/confrimModal/ConfirmModal";
import { useClearBodyScroll } from "@/hooks/useHooks";

interface IHandler {
  onClick: () => void;
  isOpen: boolean;
}

type FullProps = TodoWithRepeatType & IHandler;

export default function Todo(props: FullProps) {
  const params = useParams<{ date?: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [checkDel, setCheckDel] = useState({
    all: false,
    one: false,
  });
  useClearBodyScroll(openModal);

  const { id, text, is_import, is_time, done, isOpen, onClick, repeat_map, repeat_until, day_of_week, is_month_end } = props;

  const date = !params.date ? todayStr() : params.date;

  const isDone = done.some((d) => d.todo_id === id && d.is_done && d.render_date === date);

  let repeatLable;
  if (repeat_map) {
    repeatLable = `${repeat_map.value === "biweekly" ? "격주 · " : repeat_map.value === "weekly" ? `${repeat_map.label} · ` : repeat_map.label} ${repeat_until !== null ? `· ${repeat_until} 까지` : ""} ${is_month_end ? "· 말일" : ""}`;
  }
  const queryClient = useQueryClient();
  const { mutate: editDone } = useEditDoneMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const onChangeDele = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedId = e.target.id;
    const checked = e.target.checked;

    setCheckDel((prev) => ({
      all: false,
      one: false,
      [checkedId]: checked,
    }));
  };

  const handleDeleteRepeat = (isAll: boolean) => {
    if (!checkDel.all && !checkDel.one) {
      alert("체크버튼을 확인해 주세요");
      return;
    }

    const obj = {
      id,
      render_date: date,
      isRepeat: true,
    };

    deleteTodo(
      { ...obj, isAll },
      {
        onSuccess: () => {
          setOpenModal(false);
        },
      },
    );
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedId = e.target.id;
    const checkedState = e.target.checked;

    const targetTodo = id === checkedId;
    if (!targetTodo) return;
    const date = !params.date ? todayStr() : params.date;

    const newObj: EditTodoCheck = {
      render_date: date,
      is_done: checkedState,
      todo_id: checkedId,
    };

    editDone(newObj, {
      onSuccess: (data) => {
        handleTodoInvalidateQueries(queryClient);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <div className={`${style.position} ${isDone ? style.isDone : ""}`.trim()}>
        <div className={style.flex}>
          <CheckBtn id={id} onChange={onChange} checked={isDone}>
            <div className={style.title}>
              {is_import ? <img src="/imgs/icons/ic_important-3x.svg" alt="중요" /> : null}
              <p className={style.label}>{text}</p>
            </div>
            <div className={style["info-wrap"]}>
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
            </div>
          </CheckBtn>
        </div>
        <div className={style["btn-wrap"]}>
          {!isDone ? <Button existImg={true} src="/imgs/icons/ic_edit-pencel.svg" alt="투두수정" className="btn-18" onClick={onClick} /> : null}
          <Button
            existImg={true}
            src="/imgs/icons/ic_delete.svg"
            alt="투두삭제"
            className="btn-18"
            onClick={() => {
              if (repeat_map?.label !== "안함" && repeat_map !== null) {
                setOpenModal(true);
                return;
              }
              deleteTodo({ id, render_date: date, isAll: false, isRepeat: false });
            }}
          />
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
          is_month_end={props.is_month_end!}
          repeat_map={props.repeat_map!}
          day_of_week={props.day_of_week!}
          repeat_until={props.repeat_until}
          onClose={onClick}
        />
      )}
      {openModal && (
        <ConfirmModal
          message={`반복 설정된 할일 입니다.\n 전체삭제 하시겠습니까?`}
          onConfirm={() => {
            handleDeleteRepeat(checkDel.all);
          }}
          onCancel={() => {
            setCheckDel({ all: false, one: false });
            setOpenModal(false);
          }}
        >
          <div className={style["check-wrap"]}>
            <div className={style["check-box"]}>
              <CheckBtn id="all" checked={checkDel.all} onChange={(e) => onChangeDele(e)}>
                전체삭제
              </CheckBtn>
            </div>
            <div className={style["check-box"]}>
              <CheckBtn id="one" checked={checkDel.one} onChange={(e) => onChangeDele(e)}>
                이 날짜만 삭제
              </CheckBtn>
            </div>
          </div>
        </ConfirmModal>
      )}
    </>
  );
}
