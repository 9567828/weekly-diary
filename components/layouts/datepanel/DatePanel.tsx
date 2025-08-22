import style from "./datepanel.module.scss";
import DateControl from "./DateControl";
import PeriodView from "./PeriodView";

export default function DatePanel() {
  return (
    <div className={style.panel}>
      <DateControl date="2025년 8월" />
      <PeriodView />
    </div>
  );
}
