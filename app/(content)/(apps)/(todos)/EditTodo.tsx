import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "./edittodo.module.scss";
import Button from "@/components/ui/Button";
import InputBox from "@/components/ui/InputBox";
import ToggleBtn from "@/components/ui/toggleBtn/ToggleBtn";
import TimePicker from "./TimeWrite";
import { createPortal } from "react-dom";
import ConfirmModal from "@/components/ui/confrimModal/ConfirmModal";
import ConfirmActionBtn from "@/components/ui/confirmActionBtn/ConfirmActionBtn";
import { useAppDispatch } from "@/lib/hooks";
import { deleteTodoThunk, editTodoThunk } from "@/lib/todos/todo.thunk";

interface IEditTodo {
  id: string;
  text: string;
  isImport: boolean;
  isTime: boolean;
  time?: string;
  isAmpm?: string;
  todoDate?: string;
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

export default function EditTodo({ id, text, isImport, isTime, time, isAmpm, todoDate, onClick }: props) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(text);
  const [dateValue, setDateValue] = useState(todoDate);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOn, setConfirmOn] = useState(false);
  const [toggleChecked, setToggleChecked] = useState({
    isImport,
    isTime,
  });
  const [ampm, setAmpm] = useState<string>(isAmpm!);
  const getTime = () => {
    const h = time?.slice(0, 2);
    const m = time?.slice(3, 6);
    return { h, m };
  };
  const [hour, setHour] = useState<string>(getTime().h ?? "");
  const [min, setMin] = useState<string>(getTime().m ?? "");
  const [hasChanged, setHasChanged] = useState({ text: false, time: false, isTime: false, isImport: false });

  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setHasChanged((prev) => ({
      ...prev,
      text: text !== value,
    }));
  };

  const handleOpenModal = () => {
    setModalOpen((prev) => !prev);
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
        isImport: isImport !== checked,
      }));

      setToggleChecked((prev) => ({
        ...prev,
        isImport: checked,
      }));
    }

    if (targetId === "time") {
      setHasChanged((prev) => ({
        ...prev,
        isTime: isTime !== checked,
      }));
      setToggleChecked((prev) => ({
        ...prev,
        isTime: checked,
      }));
    }
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAmpm(e.target.value);
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

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateValue(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === "") {
      setConfirmOn(true);
      return;
    }

    const makeTime = `${hour}:${min}`;

    dispatch(
      editTodoThunk({
        id,
        text: value,
        isImport: toggleChecked.isImport,
        isTime: toggleChecked.isTime,
        time: makeTime,
        isAmpm: ampm,
        todoDate: dateValue!,
      })
    );

    onClick();
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <>
      {modalOpen ? (
        <ConfirmModal confirmOnly={false} message="변경사항 폐기" onCancel={handleOpenModal} onConfirm={onClick} />
      ) : null}
      <div className={style.bg}>
        <form className={style["edit-todo-wrap"]} onSubmit={onSubmit}>
          <ConfirmActionBtn onCancelClick={closeEdit} />
          <div className={style["edit-box"]}>
            <InputBox id="text" variant="input-underline" onChange={onChange} value={value} />
            <div>
              {selectBox.map((sel, i) => (
                <div key={i} className={`${sel.picker ? style.col : ""} ${style["select-wrap"]}`.trim()}>
                  <div className={style["select-box"]}>
                    <img src={sel.src} alt={sel.alt} />
                    <div className={style.right}>
                      <div className={`${sel.toggleId === "date" ? style["text-wrap"] : ""}`.trim()}>
                        <p className={style.title}>{sel.title}</p>
                        {sel.toggleId === "time" && toggleChecked.isTime ? (
                          <p className={style["attr-txt"]}>{`${ampm} ${time}`}</p>
                        ) : null}
                      </div>
                      {sel.toggleId !== "date" ? (
                        <ToggleBtn
                          id={sel.toggleId}
                          onChange={onChangeToggle}
                          checked={
                            sel.toggleId === "important"
                              ? toggleChecked.isImport
                              : sel.toggleId === "time"
                              ? toggleChecked.isTime
                              : false
                          }
                        />
                      ) : (
                        <input type="date" name="todoDate" id="todoDate" value={dateValue} onChange={onChangeDate} />
                      )}
                    </div>
                  </div>
                  {sel.picker && sel.toggleId === "time" && toggleChecked.isTime ? (
                    <TimePicker
                      isOpen={toggleChecked.isTime}
                      checked={true}
                      isAmpm={ampm}
                      hourValue={hour}
                      minutesValue={min}
                      onChangeHour={onChangeHour}
                      onChangeMin={onChangeMin}
                      onSelectChange={onSelectChange}
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
            onClick={() => dispatch(deleteTodoThunk(id))}
          />
        </form>
      </div>
      {confirmOn ? <ConfirmModal confirmOnly={true} message="공란" onConfirm={() => setConfirmOn(false)} /> : null}
    </>,
    document.body
  );
}
