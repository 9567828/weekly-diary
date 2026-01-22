import { usePathname } from "next/navigation";
import Button from "../../ui/Button";
import style from "./datecontrol.module.scss";

interface IButtn {
  prevBtn: () => void;
  nextBtn: () => void;
  today: () => void;
  date: string;
}

export default function DateControl({ date, prevBtn, today, nextBtn }: IButtn) {
  const path = usePathname();
  const isDiary = path.startsWith("/diary");

  return (
    <div className={style["date-wrap"]}>
      <p className={style["this-month"]}>{date}</p>
      <div className={style["btn-wrap"]}>
        <Button existImg={true} src="/imgs/icons/ic_arrow-left.svg" alt="이전으로가기" variant="btn-18" onClick={prevBtn} />
        <Button label={isDiary ? "이번주" : "오늘"} variant="txt-btn" className="today-btn" onClick={today} />
        <Button existImg={true} src="/imgs/icons/ic_arrow-right.svg" alt="다음으로가기" variant="btn-18" onClick={nextBtn} />
      </div>
    </div>
  );
}
