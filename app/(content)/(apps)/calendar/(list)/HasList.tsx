"use client";

import Button from "@/components/ui/Button";
import style from "./list.module.scss";
import { IDiary } from "@/lib/diary/diary.interface";
import { ITodo } from "@/lib/todos/todo.interface";
import { useRouter } from "next/navigation";
import { drawWeeks } from "@/components/calendar/drawWeek";
import { parse } from "date-fns";
import { TodoRow } from "@/utils/supabase";

interface IHasList {
  toDos: TodoRow[];
  diaries: IDiary[];
  currDate: string;
}

export default function HasList({ toDos, diaries, currDate }: IHasList) {
  const { getWeekStartFormatStr } = drawWeeks();
  const route = useRouter();

  const weekStart = getWeekStartFormatStr(parse(currDate, "yyyy-MM-dd", new Date()));

  const doneLength = toDos.filter((t) => t.is_done);
  const notLength = toDos.filter((t) => !t.is_done);

  const todoList = [
    { title: "할일목록", length: notLength.length },
    { title: "완료목록", length: doneLength.length },
  ];

  const movePage = (path: string) => {
    route.push(path);
  };

  return (
    <div>
      <div className={style["diary-list"]}>
        <div className={style.head}>
          <p className={style.title}>주간다이어리</p>
          <Button label="상세보기" className="detail-btn" onClick={() => movePage(`/diary/${weekStart}`)} />
        </div>
        <div className={style["list-wrap"]}>
          {diaries.length !== 0 ? (
            <img src="/imgs/icons/ic_complete.svg" alt="완료" />
          ) : (
            <img src="/imgs/icons/ic_incomplete.svg" alt="미완료" />
          )}
          {diaries.length !== 0 ? <p>일기썼다</p> : <p>일기 없음</p>}
        </div>
      </div>
      <div>
        <div className={style.head}>
          <p className={style.title}>TODO</p>
          <Button label="상세보기" className="detail-btn" onClick={() => movePage(`/${currDate}`)} />
        </div>
        <ul className={style["todo-list"]}>
          {todoList.map((t, i) => (
            <li key={i} className={style["list-wrap"]}>
              <span className={style.dot}></span>
              <p className={style.name}>{`${t.title} (${t.length})`}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
