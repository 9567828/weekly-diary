import Link from "next/link";
import style from "../calender.module.scss";

interface IDatesProps {
  isToday: boolean;
  href: string;
  isActive: boolean;
  date: number;
  isExisted: any;
  isWeekend: boolean;
  otherDate?: boolean;
}

export default function DatesWrap({ date, isActive, isExisted, isToday, href, isWeekend, otherDate = false }: IDatesProps) {
  return (
    <li className={style["date-box"]}>
      <div
        className={`${style.date} ${isToday ? style.today : ""} ${
          isActive ? style.active : ""
        } ${isWeekend ? style.weekend : ""} ${otherDate ? style["other-date"] : ""}`.trim()}
      >
        <Link href={href}>{date}</Link>
      </div>
      {isExisted ? <span className={style.dot}></span> : null}
    </li>
  );
}
