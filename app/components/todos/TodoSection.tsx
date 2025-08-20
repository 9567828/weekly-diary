import TodoListTitle from "../ui/TodoListTitle";
import style from "../../../styles/components/todos/todopage.module.scss";
import { ITodo } from "@/lib/store";
import Todo from "./Todo";
import { useEffect, useState } from "react";

interface ITodoSectionProps {
  title: string;
  toDos: ITodo[];
  filter: (todo: ITodo) => boolean;
}

export default function TodoSection({ title, toDos, filter }: ITodoSectionProps) {
  const filteredTodos = toDos.filter(filter);
  const [openEditId, setOpenEditId] = useState<string | null>(null);

  const onClickEdit = (id: string) => {
    setOpenEditId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <TodoListTitle title={title} number={filteredTodos.length} />
      <div className={style["todo-list"]}>
        {filteredTodos.map((menu) => (
          <Todo
            key={menu.id}
            id={menu.id}
            label={menu.text}
            isTime={menu.isTime}
            isImport={menu.isImportant}
            time={menu.time}
            isComplete={menu.isComplete}
            onClick={() => onClickEdit(menu.id)}
            isOpen={openEditId === menu.id}
          />
        ))}
      </div>
    </div>
  );
}
