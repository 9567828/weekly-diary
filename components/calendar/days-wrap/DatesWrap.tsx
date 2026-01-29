import Link from "next/link";
import style from "../calender.module.scss";

interface IDatesProps {
  isToday: boolean;
  cnt: number;
  isDone: boolean;
  allDone?: boolean;
  href: string;
  isActive: boolean;
  date: number;
  isWeekend: boolean;
  otherDate?: boolean;
}

export default function DatesWrap({ date, isActive, cnt = 0, isDone, allDone = false, isToday, href, isWeekend, otherDate = false }: IDatesProps) {
  return (
    <li>
      <Link href={href} className={style["date-box"]}>
        {/* 0개일때 = 빈칸 / 1개 이상 = 숫자 표시 / 1개 이상 완료시 = 배경색변경 / 모두완료시 = 숫자 -> 체크로  */}
        <div className={`${style["todo-box"]} ${isDone || allDone ? `${style.done}` : ""}`.trim()}>
          <span>{allDone ? "✓" : cnt !== 0 ? cnt : ""}</span>
        </div>
        <div
          className={`${style.date} ${isToday ? style.today : ""} ${isActive ? style.active : ""} ${isWeekend ? style.weekend : ""} ${otherDate ? style["other-date"] : ""}`.trim()}
        >
          <span>{date}</span>
        </div>
      </Link>
    </li>
  );
}
