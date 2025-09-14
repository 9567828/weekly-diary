"use client";

import { ChangeEvent } from "react";
import style from "./time.module.scss";
import InputBox from "@/components/ui/InputBox";

interface ITime {
  onChangeHour: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeMin: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  checked: boolean;
  hourValue: string;
  minutesValue: string;
  isAmpm: string | undefined;
  isOpen?: boolean;
}

export default function TimeWrite({ isOpen, hourValue, minutesValue, isAmpm, onChangeHour, onChangeMin, onSelectChange }: ITime) {
  return (
    <div className={`${style["time-container"]} ${isOpen ? style["open"] : ""}`.trim()}>
      <div className={style["time-text"]}>
        <select name="ampm" id="ampm" onChange={onSelectChange} defaultValue={isAmpm}>
          <option value="오전">오전</option>
          <option value="오후">오후</option>
        </select>
        <div className={style["input-time"]}>
          <div className={style.width}>
            <InputBox type="number" variant="input-time" onChange={onChangeHour} value={hourValue} />
          </div>
          <p>:</p>
          <div className={style.width}>
            <InputBox type="number" variant="input-time" onChange={onChangeMin} value={minutesValue} />
          </div>
        </div>
      </div>
    </div>
  );
}
