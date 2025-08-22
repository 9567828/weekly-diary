"use client";

import style from "./page.module.scss";
import AddTodo from "./(todos)/AddTodo";
import { RootState, ITodo } from "@/lib/store";
import { connect } from "react-redux";
import TodoSection from "./(todos)/TodoSection";

interface HomeProps {
  toDos: ITodo[];
  editTodo: (todo: ITodo) => void;
}

function Home({ toDos }: HomeProps) {
  return (
    <div className={style["column"]}>
      <AddTodo />
      <TodoSection title="할일 목록" toDos={toDos} filter={(t) => !t.isComplete} />
      <TodoSection title="완료 목록" toDos={toDos} filter={(t) => t.isComplete} />
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return { toDos: state.toDos };
}

export default connect(mapStateToProps)(Home);
