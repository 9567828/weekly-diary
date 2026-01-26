import style from "./custom.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import CheckBtn from "@/components/ui/checkBtn/CheckBtn";
import InputDate from "@/components/ui/InputDate";
import { RepeatMapType } from "@/utils/supabase";

type daysType = "월" | "화" | "수" | "목" | "금" | "토" | "일";
type daysMapType = {
  dayIndex: number;
  day: daysType;
};

const daysList: daysMapType[] = [
  { dayIndex: 1, day: "월" },
  { dayIndex: 2, day: "화" },
  { dayIndex: 3, day: "수" },
  { dayIndex: 4, day: "목" },
  { dayIndex: 5, day: "금" },
  { dayIndex: 6, day: "토" },
  { dayIndex: 0, day: "일" },
];

interface InputDateProps {
  repeatType: RepeatMapType;
  selectDays: number[];
  onSelectDays: (days: number) => void;
  untilValue: string;
  onChangeUntil: (e: ChangeEvent<HTMLInputElement>) => void;
  checkedEnd: boolean;
  onChangeCheckd: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function RepeatWrap({ repeatType, selectDays, onSelectDays, untilValue, onChangeUntil, checkedEnd, onChangeCheckd }: InputDateProps) {
  const handleSelectDays = (days: number) => {
    onSelectDays(days);
  };

  return (
    <div className={style["date-container"]}>
      {(repeatType.value === "weekly" || repeatType.value === "biweekly") && (
        <div className={style["days-container"]}>
          <div className={style["tooltip-wrap"]}>
            <p>요일선택</p>
            <div className={style.tooltip}>
              <img src="/imgs/icons/ic_help.svg" alt="도움말" />
              <p>요일을 선택하지 않으면 날짜 기준으로 반복됩니다.</p>
            </div>
          </div>
          <div className={style["days-wrapper"]}>
            {daysList.map((d) => {
              const isActive = selectDays.includes(d.dayIndex);

              console.log(selectDays);

              return (
                <button key={d.dayIndex} type="button" className={`${isActive ? style.active : ""}`.trim()} onClick={() => handleSelectDays(d.dayIndex)}>
                  {d.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {repeatType.value !== "none" && (
        <div className={style["until-container"]}>
          <div className={style["check-wrap"]}>
            <CheckBtn id="repeatEnd" onChange={onChangeCheckd} checked={checkedEnd}>
              종료날짜
            </CheckBtn>
          </div>
          <div className={`${checkedEnd ? style.show : style.hidden}`.trim()}>
            <InputDate id="untilDate" value={untilValue} onChange={onChangeUntil} />
          </div>
        </div>
      )}
    </div>
  );
}
