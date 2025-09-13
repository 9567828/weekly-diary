import style from "./todo.module.scss";
import CheckBtn from "../../../../components/ui/checkBtn/CheckBtn";
import Button from "../../../../components/ui/Button";
import EditTodo from "./EditTodo";
import { ChangeEvent, useEffect } from "react";
import { checkDone } from "@/utils/supabase/todo";
import { ITodo } from "@/lib/todos/todo.interface";

interface IHandler {
  onClick: () => void;
  isOpen: boolean;
  // editTodo: (todo: ITodo) => void;
  onDeleteTodo: () => void;
}

interface IBaseTodo {
  id: string;
  label: string;
  isImport: boolean;
  isDone: boolean;
  isTime: boolean;
  time?: string;
}

type FullProps = IBaseTodo & IHandler;

export default function Todo(props: FullProps) {
  const { id, label, isImport, isTime, isDone, isOpen, onClick, onDeleteTodo } = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedId = e.target.id;
    const checkedState = e.target.checked;

    const targetTodo = id === checkedId;
    if (!targetTodo) return;

    const updatedTodo = {
      id,
      text: label,
      isImport: isImport,
      isTime,
      time: isTime ? props.time : "",
      isDone: checkedState,
    };

    // editTodo(updatedTodo);
  };

  useEffect(() => {
    const getList = async () => {
      return await checkDone(id, isDone);
    };
    getList();
  });

  return (
    <>
      <div className={`${style.position} ${isDone ? style.isDone : ""}`.trim()}>
        <div className={style.flex}>
          <CheckBtn id={id} onChange={onChange} checked={isDone}>
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
          {!isDone ? (
            <Button existImg={true} src="/imgs/icons/ic_edit-pencel.svg" alt="투두수정" className="btn-18" onClick={onClick} />
          ) : null}
          <Button existImg={true} src="/imgs/icons/ic_delete.svg" alt="투두삭제" className="btn-18" onClick={onDeleteTodo} />
        </div>
      </div>
      {isOpen ? (
        <EditTodo
          id={id}
          label={label}
          isImport={isImport}
          isTime={isTime}
          time={props.time}
          isDone={isDone}
          onClick={onClick}
          onDeleteTodo={onClick}
        />
      ) : null}
    </>
  );
}

// function mapDispatchToProps(dispatch: Dispatch, ownProps: IBaseTodo) {
//   return {
//     editTodo: (todo: ITodo) => {
//       const updateTodo = getLocalItem().map((t) =>
//         t.id === todo.id ? { ...t, ...todo, time: todo.isTime ? todo.time : "" } : t
//       );
//       setLocalItem(updateTodo);
//       dispatch(edit(todo));
//     },
//     onDeleteTodo: () => {
//       const deleteTodo = getLocalItem().filter((todo) => todo.id !== ownProps.id);
//       setLocalItem(deleteTodo);
//       dispatch(remove(ownProps.id));
//     },
//   };
// }

// export default connect(null, mapDispatchToProps)(Todo);
