import { ChangeEvent, useState } from "react";
import style from "../../../styles/components/todos/edittodo.module.scss";
import Button from "../ui/Button";
import InputBox from "../ui/InputBox";
import ToggleBtn from "../ui/ToggleBtn";
import { edit, getLocalItem, ITodo, remove, setLocalItem } from "@/lib/store";
import TimePicker from "./TimeWrite";
import { connect } from "react-redux";
import { Dispatch } from "redux";

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

  return (
    <div className={style["edit-todo-wrap"]}>
      <div className={style["btn-wrap"]}>
        <Button isTxtBtn={true} label="취소" classNameKey={"cancel"} onClick={onClick} />
        <Button isTxtBtn={true} label="완료" classNameKey={"txtBtn"} />
      </div>
      <div className={style["edit-box"]}>
        <InputBox onChange={onChange} value={value} />
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
      <Button isTxtBtn={true} label="할일 삭제하기" classNameKey={"delete-todo"} onClick={onDeleteTodo} />
    </div>
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
