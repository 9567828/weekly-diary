import style from "./period.module.scss";

interface IWeekDate {
  weekStart: Date;
  weekEnd: Date;
}

export default function PeriodView({ weekStart, weekEnd }: IWeekDate) {
  const startStr = String(weekStart.getDate()).padStart(2, "0");
  const endStr = String(weekEnd.getDate()).padStart(2, "0");
  return (
    <div className={style["period-wrap"]}>
      <img src="/imgs/icons/ic_calendar.svg" alt="달력" className={style.img} />
      <p className={style.txt}>{`${startStr}일 - ${endStr}일`}</p>
    </div>
  );
}
