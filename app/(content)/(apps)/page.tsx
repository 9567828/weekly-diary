import style from "../../../styles/components/todos/todopage.module.scss";
import AddTodo from "../../components/todos/AddTodo";
import TodoListTitle from "../../components/ui/TodoListTitle";
import Todo from "../../components/todos/Todo";

export default function Home() {
  return (
    <div className={style["column"]}>
      <AddTodo />
      <div>
        <TodoListTitle title="할일 목록" number={0} />
        <div className={style["todo-list"]}>
          <Todo id="dd" label="출근하기" isTime={false} />
          <Todo id="bb" label="일지쓰기" isTime={true} time="08:00" />
        </div>
      </div>
      <TodoListTitle title="완료 목록" number={0} />
    </div>
  );
}
