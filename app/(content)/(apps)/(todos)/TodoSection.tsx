import style from "./todos.module.scss";
import Todo from "./TodoBox";
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

  return (
    <div>
      <TodoListTitle title={title} number={filteredTodos.length} />
      <div className={style["todo-list"]}>
        {filteredTodos.map((menu) => (
          <Todo
            key={menu.id}
            id={menu.id}
            text={menu.text}
            isTime={menu.isTime}
            isImport={menu.isImport}
            time={menu.time}
            isAmpm={menu.isAmpm}
            todoDate={menu.todoDate}
            isDone={menu.isDone}
            onClick={() => onClickEdit(menu.id)}
            isOpen={openEditId === menu.id}
          />
        ))}
      </div>
    </div>
  );
}
