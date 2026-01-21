import style from "./todos.module.scss";
import Todo from "./TodoBox";
import { useState } from "react";
import TodoListTitle from "@/components/ui/todoListTitle/TodoListTitle";
import { TodoRow } from "@/utils/supabase";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleTodo } from "@/lib/slices/tabbarSlice";

interface ITodoSectionProps {
  title: string;
  toDos: TodoRow[];
  filter: (todo: TodoRow) => boolean;
}

export default function TodoSection({ title, toDos, filter }: ITodoSectionProps) {
  const filteredTodos = toDos.filter(filter);
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector((state) => state.tabbar.isTodoTexing);

  const [openEditId, setOpenEditId] = useState<string | null>(null);

  const onClickEdit = (id: string) => {
    setOpenEditId((prev) => (prev === id ? null : id));
    if (isEdit === "edit") {
      dispatch(handleTodo(null));
    } else {
      dispatch(handleTodo("edit"));
    }
  };

  return (
    <div>
      <TodoListTitle title={title} number={filteredTodos.length} />
      <div className={style["todo-list"]}>
        {filteredTodos.map((menu) => (
          <Todo
            key={menu.id}
            id={menu.id}
            text={menu.text!}
            is_time={menu.is_time!}
            is_import={menu.is_import!}
            time={menu.time!}
            is_ampm={menu.is_ampm}
            todo_date={menu.todo_date}
            is_done={menu.is_done}
            onClick={() => onClickEdit(menu.id)}
            isOpen={openEditId === menu.id}
          />
        ))}
      </div>
    </div>
  );
}
