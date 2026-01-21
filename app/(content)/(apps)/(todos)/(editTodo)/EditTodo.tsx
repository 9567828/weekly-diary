import { ChangeEvent, FormEvent, useState } from "react";
import style from "./edittodo.module.scss";
import Button from "@/components/ui/Button";
import InputBox from "@/components/ui/InputBox";
import ToggleBtn from "@/components/ui/toggleBtn/ToggleBtn";
import TimePicker from "../(time)/TimeWrite";
import ConfirmModal from "@/components/ui/confrimModal/ConfirmModal";
import ConfirmActionBtn from "@/components/ui/confirmActionBtn/ConfirmActionBtn";
import { AmPmType, EditTodoType, TodoRow } from "@/utils/supabase";
import { useDeleteTodoMutation, useEditTodoMutation } from "@/hooks/useMutation/useTodoMutation";
import { useQueryClient } from "@tanstack/react-query";
import { todoDateKey } from "@/hooks/useQuerys/useTodoQuery";

interface IEditTodo {
  id: string;
  text: string;
  is_import: boolean;
  is_time: boolean;
  time?: string;
  is_ampm?: AmPmType;
  todo_date?: string;
}

interface IHandler {
  onClick: () => void;
}

type props = IEditTodo & IHandler;

const selectBox = [
  { src: "/imgs/icons/ic_important.svg", alt: "중요아이콘", title: "중요", toggleId: "important", picker: false },
  { src: "/imgs/icons/ic_time.svg", alt: "시간아이콘", title: "시간", toggleId: "time", picker: true },
  { src: "/imgs/icons/ic_calendar.svg", alt: "달력아이콘", title: "날짜", toggleId: "date", picker: true },
];

export default function EditTodo({ id, text, is_import, is_time, time, is_ampm, todo_date, onClick }: props) {
  const queryClient = useQueryClient();
  const { mutate: edit } = useEditTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  const [value, setValue] = useState(text);
  const [dateValue, setDateValue] = useState(todo_date);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOn, setConfirmOn] = useState(false);
  const [toggleChecked, setToggleChecked] = useState({
    is_import,
    is_time,
  });
  const [ampm, setAmpm] = useState<AmPmType | null>(is_ampm ?? null);
  const getTime = () => {
    const h = time?.slice(0, 2);
    const m = time?.slice(3, 6);
    return { h, m };
  };
  const [hour, setHour] = useState<string>(getTime().h ?? "");
  const [min, setMin] = useState<string>(getTime().m ?? "");
  const [hasChanged, setHasChanged] = useState({ text: false, time: false, is_time: false, is_import: false });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setHasChanged((prev) => ({
      ...prev,
      text: text !== value,
    }));
  };

  const closeEdit = () => {
    const anyChanged = Object.values(hasChanged).some((val) => val === true);
    if (anyChanged) {
      setModalOpen(true);
    } else {
      onClick();
    }
  };

  const onChangeToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const targetId = e.target.id;
    const checked = e.target.checked;

    if (targetId === "important") {
      setHasChanged((prev) => ({
        ...prev,
        is_import: is_import !== checked,
      }));

      setToggleChecked((prev) => ({
        ...prev,
        is_import: checked,
      }));
    }

    if (targetId === "time") {
      setHasChanged((prev) => ({
        ...prev,
        is_time: is_time !== checked,
      }));
      setToggleChecked((prev) => ({
        ...prev,
        is_time: checked,
      }));
    }
  };

  const onChangeHour = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.slice(0, 2);

    if (parseInt(value, 10) >= 24) {
      value = "00";
    }

    setHour(value);
  };

  const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.slice(0, 2);

    if (parseInt(value, 10) >= 60) {
      value = "00";
    }

    setMin(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value!.trim() === "") {
      setConfirmOn(true);
      return;
    }

    const makeTime = `${hour}:${min}`;

    const editObj: EditTodoType = {
      payload: {
        text: value,
        todo_date: dateValue!,
        is_import: toggleChecked.is_import,
        is_time: toggleChecked.is_time,
        is_ampm: ampm || "오전",
        time: makeTime,
      },
      id,
    };

    edit(editObj, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({
          queryKey: todoDateKey,
        });
        onClick();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <>
      <div className={style.bg}>
        <form className={style["edit-todo-wrap"]} onSubmit={onSubmit}>
          <ConfirmActionBtn onCancelClick={closeEdit} />
          <div className={style["edit-box"]}>
            <InputBox id="text" variant="input-underline" onChange={onChange} value={value!} />
            <div>
              {selectBox.map((sel, i) => (
                <div key={i} className={`${sel.picker ? style.col : ""} ${style["select-wrap"]}`.trim()}>
                  <div className={style["select-box"]}>
                    <img src={sel.src} alt={sel.alt} />
                    <div className={style.right}>
                      <div className={`${sel.toggleId === "date" ? style["text-wrap"] : ""}`.trim()}>
                        <p className={style.title}>{sel.title}</p>
                        {sel.toggleId === "time" && toggleChecked.is_time ? (
                          <p className={style["attr-txt"]}>{`${ampm} ${time}`}</p>
                        ) : null}
                      </div>
                      {sel.toggleId !== "date" ? (
                        <ToggleBtn
                          id={sel.toggleId}
                          onChange={onChangeToggle}
                          checked={
                            sel.toggleId === "important"
                              ? toggleChecked.is_import!
                              : sel.toggleId === "time"
                                ? toggleChecked.is_time!
                                : false
                          }
                        />
                      ) : (
                        <input
                          type="date"
                          name="todo_date"
                          id="todo_date"
                          value={dateValue}
                          onChange={(e) => setDateValue(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                  {sel.picker && sel.toggleId === "time" && toggleChecked.is_time ? (
                    <TimePicker
                      isOpen={toggleChecked.is_time}
                      checked={true}
                      isAmpm={ampm as AmPmType}
                      hourValue={hour}
                      minutesValue={min}
                      onChangeHour={onChangeHour}
                      onChangeMin={onChangeMin}
                      onSelectChange={(e) => {
                        const selValue = e.target.value as AmPmType;
                        setAmpm(selValue);
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Button
            type="button"
            label="할일 삭제하기"
            variant="txt-btn"
            className="delete-txt-btn"
            onClick={() => deleteTodo(id)}
          />
        </form>
      </div>
      {confirmOn ? <ConfirmModal confirmOnly={true} message="공란" onConfirm={() => setConfirmOn(false)} /> : null}
      {modalOpen ? (
        <ConfirmModal
          confirmOnly={false}
          message="변경사항 폐기"
          onCancel={() => setModalOpen((prev) => !prev)}
          onConfirm={onClick}
        />
      ) : null}
    </>
  );
}
