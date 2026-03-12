import { useState } from "react";
import style from "./todo.module.scss";
import Todo from "./TodoBox";
import TodoListTitle from "@/components/ui/todoListTitle/TodoListTitle";
import { TodoWithRepeatType } from "@/utils/supabase";
import { useClearBodyScroll } from "@/hooks/useHooks";

interface ITodoSectionProps {
  title: string;
  toDos: TodoWithRepeatType[];
}

export default function TodoSection({ title, toDos }: ITodoSectionProps) {
  const [openEditId, setOpenEditId] = useState<string | null>(null);

  useClearBodyScroll(openEditId !== null);

  const onClickEdit = (id: string) => {
    setOpenEditId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <TodoListTitle title={title} number={toDos.length} />
      <div className={style["todo-list"]}>
        {toDos.map((menu) => (
          <Todo key={menu.id} {...menu} onClick={() => onClickEdit(menu.id)} isOpen={openEditId === menu.id} />
        ))}
      </div>
    </div>
  );
}
