import { ChangeEvent, useEffect, useState } from "react";
import style from "./edittodo.module.scss";
import Button from "../../../../components/ui/Button";
import InputBox from "../../../../components/ui/inputBox/InputBox";
import ToggleBtn from "../../../../components/ui/toggleBtn/ToggleBtn";
import { edit, getLocalItem, ITodo, remove, setLocalItem } from "@/lib/store";
import TimePicker from "./TimeWrite";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createPortal } from "react-dom";

interface IEditTodo {
  id: string;
  label: string;
  isImport: boolean;
  isTime: boolean;
  time: string;
  isComplete: boolean;
}

interface IHandler {
  onClick: () => void;
  editTodo: (todo: ITodo) => void;
  onDeleteTodo: () => void;
}

type props = IEditTodo & IHandler;

const selectBox = [
  { src: "/imgs/icons/ic_important.svg", alt: "중요아이콘", title: "중요", toggleId: "important" },
  { src: "/imgs/icons/ic_time.svg", alt: "시간아이콘", title: "시간", toggleId: "time" },
];

function EditTodo({ id, label, isImport, isTime, time, isComplete, editTodo, onDeleteTodo, onClick }: props) {
  const [value, setValue] = useState(label);
  const [mounted, setMounted] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onChangeToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const targetId = e.target.id;
    const checked = e.target.checked;

    const updatedTodo: ITodo = {
      id,
      text: label,
      isImportant: targetId === "important" ? checked : isImport,
      isTime: targetId === "time" ? checked : isTime,
      time:
        targetId === "time"
          ? checked
            ? "09:00"
            : "" // 고정 기본값
          : time,
      isComplete,
    };
    editTodo(updatedTodo);
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div className={style.bg}>
      <div className={style["edit-todo-wrap"]}>
        <Button existImg={true} src="/imgs/icons/ic_Close.svg" alt="닫기" variant={"btn24"} onClick={onClick} />
        <div className={style["edit-box"]}>
          <InputBox variant={"underline"} onChange={onChange} value={value} />
          <div className="select-wrap">
            {selectBox.map((sel, i) => (
              <div key={i} className={style["select-box"]}>
                <img src={sel.src} alt={sel.alt} />
                <div className={style.right}>
                  <div>
                    <p className={style.title}>{sel.title}</p>
                    {sel.toggleId === "time" && isTime ? <p className={style["time-txt"]}>{`오후 ${time}`}</p> : null}
                  </div>
                  <ToggleBtn
                    id={sel.toggleId}
                    onChange={onChangeToggle}
                    on={sel.toggleId === "important" ? isImport : sel.toggleId === "time" ? isTime : false}
                  />
                </div>
              </div>
            ))}
          </div>
          <TimePicker />
        </div>
        <Button label="할일 삭제하기" variant="txt-btn" className="delete-txt-btn" onClick={onDeleteTodo} />
      </div>
    </div>,
    document.body
  );
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: IEditTodo) {
  return {
    editTodo: (todo: ITodo) => {
      const updateTodo = getLocalItem().map((t) =>
        t.id === todo.id ? { ...t, ...todo, time: todo.isTime ? todo.time : "" } : t
      );
      setLocalItem(updateTodo);
      dispatch(edit(todo));
    },
    onDeleteTodo: () => {
      const deleteTodo = getLocalItem().filter((todo) => todo.id !== ownProps.id);
      setLocalItem(deleteTodo);
      dispatch(remove(ownProps.id));
    },
  };
}

export default connect(null, mapDispatchToProps)(EditTodo);
