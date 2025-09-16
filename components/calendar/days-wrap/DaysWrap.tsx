import style from "../calender.module.scss";

const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function DaysWrap() {
  return (
    <ul className={style["week-wrap"]}>
      {weekdays.map((w, i) => (
        <li key={i} className={style["week-text"]}>
          {w}
        </li>
      ))}
    </ul>
  );
}
