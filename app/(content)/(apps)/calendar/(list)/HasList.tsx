import Button from "@/components/ui/Button";
import style from "./list.module.scss";

const todoList = [{ title: "할일목록" }, { title: "완료목록" }];

export default function HasList() {
  return (
    <div>
      <div className={style["diary-list"]}>
        <div className={style.head}>
          <p className={style.title}>주간다이어리</p>
          <Button label="상세보기" className="detail-btn" />
        </div>
        <div className={style["list-wrap"]}>
          <img src="/imgs/icons/ic_complete.svg" alt="완료" />
          {/* <img src="/imgs/icons/ic_incomplete.svg" alt="미완료" /> */}
          <p>일기썼다</p>
        </div>
      </div>
      <div>
        <div className={style.head}>
          <p className={style.title}>TODO</p>
          <Button label="상세보기" className="detail-btn" />
        </div>
        <ul className={style["todo-list"]}>
          {todoList.map((t, i) => (
            <li key={i} className={style["list-wrap"]}>
              <span className={style.dot}></span>
              <p className={style.name}>{`${t.title} (0)`}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
