import Button from "../../ui/button/Button";
import style from "./datecontrol.module.scss";

interface IButtn {
  prevBtn?: () => void;
  nextBtn?: () => void;
  today?: () => void;
  date: string;
}

export default function DateControl({ date, prevBtn, today, nextBtn }: IButtn) {
  return (
    <div className={style["date-wrap"]}>
      <p className={style["this-month"]}>{date}</p>
      <div className={style["btn-wrap"]}>
        <Button existImg={true} isTxtBtn={false} src="/imgs/icons/ic_arrow-left.svg" alt="이전으로가기" onClick={prevBtn} />
        <Button isTxtBtn={true} label="오늘" classNameKey={"todayBtn"} onClick={today} />
        <Button existImg={true} isTxtBtn={false} src="/imgs/icons/ic_arrow-right.svg" alt="다음으로가기" onClick={nextBtn} />
      </div>
    </div>
  );
}
