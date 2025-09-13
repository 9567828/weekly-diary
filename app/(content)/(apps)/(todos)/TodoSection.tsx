import style from "../page.module.scss";
import Todo from "./Todo";
import { useState } from "react";
import TodoListTitle from "@/components/ui/todoListTitle/TodoListTitle";
import { ITodo } from "@/lib/todos/todo.interface";

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

  const onDelete = () => {
    console.log("클릭");
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
            isImport={menu.isImport}
            time={menu.time}
            isDone={menu.isDone}
            onClick={() => onClickEdit(menu.id)}
            isOpen={openEditId === menu.id}
            onDeleteTodo={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
