import style from "./todos.module.scss";
import Todo from "./TodoBox";
import { useState } from "react";
import TodoListTitle from "@/components/ui/todoListTitle/TodoListTitle";
import { ITodo } from "@/lib/todos/todo.interface";
import { TodoRow } from "@/utils/supabase";

interface ITodoSectionProps {
  title: string;
  toDos: TodoRow[];
  filter: (todo: TodoRow) => boolean;
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
