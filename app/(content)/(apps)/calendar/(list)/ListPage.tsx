"use client";

import { useParams, useRouter } from "next/navigation";
import style from "./list.module.scss";
import { drawWeeks, today } from "@/components/calendar/drawWeek";
import { format, parse } from "date-fns";
import { useFetchTodoByDate } from "@/hooks/useQuerys/useTodoQuery";
import Button from "@/components/ui/Button";
import { useFetchDiaryByDate } from "@/hooks/useQuerys/useDiaryQuery";

export default function ListPage() {
  const { id } = useParams();

  const { getWeekStartFormatStr } = drawWeeks();
  const route = useRouter();
  const currDate = id ? String(id) : format(today(), "yyyy-MM-dd");
  const weekStart = getWeekStartFormatStr(parse(currDate, "yyyy-MM-dd", new Date()));
  const { data: toDos, error: todoErr, isError: isTodoErr } = useFetchTodoByDate(currDate);
  const { data: diary, error: diaryErr, isError: isDiaryErr } = useFetchDiaryByDate(currDate);

  if (isDiaryErr) {
    console.log("diary? ", diaryErr.message);
  }

  const doneLength = toDos?.filter((t) => t.is_done);
  const notLength = toDos?.filter((t) => !t.is_done);

  const todoList = [
    { title: "할일목록", length: notLength?.length ? notLength.length : 0 },
    { title: "완료목록", length: doneLength?.length ? doneLength.length : 0 },
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
          {diary?.diary_date === currDate ? (
            <img src="/imgs/icons/ic_complete.svg" alt="완료" />
          ) : (
            <img src="/imgs/icons/ic_incomplete.svg" alt="미완료" />
          )}
          {diary?.diary_date === currDate ? <p>일기썼다</p> : <p>일기 없음</p>}
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
