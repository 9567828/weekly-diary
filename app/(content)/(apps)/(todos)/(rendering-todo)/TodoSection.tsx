import { useState } from "react";
import style from "./todo.module.scss";
import Todo from "./TodoBox";
import TodoListTitle from "@/components/ui/todoListTitle/TodoListTitle";
import { TodoRow, TodoWithRepeatType } from "@/utils/supabase";
import { useClearBodyScroll } from "@/hooks/useHooks";

interface ITodoSectionProps {
  title: string;
  toDos: TodoWithRepeatType[];
  filter: (todo: TodoWithRepeatType) => boolean;
}

export default function TodoSection({ title, toDos, filter }: ITodoSectionProps) {
  const filteredTodos = toDos.filter(filter);

  const [openEditId, setOpenEditId] = useState<string | null>(null);

  useClearBodyScroll(openEditId);

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
            is_month_end={menu.is_month_end!}
            repeat_map={menu.repeat_map!}
            day_of_week={menu.day_of_week}
            repeat_until={menu.repeat_until}
            onClick={() => onClickEdit(menu.id)}
            isOpen={openEditId === menu.id}
          />
        ))}
      </div>
    </div>
  );
}
