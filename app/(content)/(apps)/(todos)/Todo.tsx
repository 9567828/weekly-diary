import style from "./todo.module.scss";
import CheckBtn from "../../../../components/ui/checkBtn/CheckBtn";
import Button from "../../../../components/ui/button/Button";
import EditTodo from "./EditTodo";
import { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { edit, getLocalItem, ITodo, remove, setLocalItem } from "@/lib/store";
import { Dispatch } from "redux";

interface IHandler {
  onClick: () => void;
  isOpen: boolean;
  editTodo: (todo: ITodo) => void;
  onDeleteTodo: () => void;
}

interface IBaseTodo {
  id: string;
  label: string;
  isImport: boolean;
  isComplete: boolean;
  isTime: boolean;
  time: string;
}

type FullProps = IBaseTodo & IHandler;

function Todo(props: FullProps) {
  const { id, label, isImport, isTime, isComplete, isOpen, onClick, editTodo, onDeleteTodo } = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedId = e.target.id;
    const checkedState = e.target.checked;

    const targetTodo = id === checkedId;
    if (!targetTodo) return;

    const updatedTodo: ITodo = {
      id,
      text: label,
      isImportant: isImport,
      isTime,
      time: isTime ? props.time : "",
      isComplete: checkedState,
    };

    editTodo(updatedTodo);
  };

  // useEffect(() => {
  //   const footer = document.querySelector("footer");
  //   if (footer) {
  //     if (isOpen) {
  //       footer.style.bottom = "-69px";
  //     } else {
  //       footer.style.removeProperty("bottom");
  //     }
  //   }
  // }, [isOpen]);

  return (
    <>
      <div className={`${style.position} ${isComplete ? style.isComplete : ""}`.trim()}>
        <div className={style.flex}>
          <CheckBtn id={id} onChange={onChange} checked={isComplete}>
            <div className={style.title}>
              {isImport ? <img src="/imgs/icons/ic_important-3x.svg" alt="중요" /> : null}
              <p className={style["label"]}>{label}</p>
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
          {!isComplete ? (
            <Button
              isTxtBtn={false}
              existImg={true}
              src="/imgs/icons/ic_edit-pencel.svg"
              alt="투두수정"
              classNameKey={"edit-btn"}
              onClick={onClick}
            />
          ) : null}
          <Button
            isTxtBtn={false}
            existImg={true}
            src="/imgs/icons/ic_delete.svg"
            alt="투두삭제"
            classNameKey={"del-btn"}
            onClick={onDeleteTodo}
          />
        </div>
      </div>
      {isOpen ? (
        <EditTodo
          id={id}
          label={label}
          isImport={isImport}
          isTime={isTime}
          time={props.time}
          isComplete={isComplete}
          onClick={onClick}
        />
      ) : null}
    </>
  );
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: IBaseTodo) {
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

export default connect(null, mapDispatchToProps)(Todo);
