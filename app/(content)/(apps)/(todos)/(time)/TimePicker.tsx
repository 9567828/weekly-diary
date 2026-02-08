"use client";

import { ChangeEvent } from "react";
import style from "./time.module.scss";
import InputBox from "@/components/ui/InputBox";
import { AmPmType } from "@/utils/supabase";

export interface ITimePicker {
  onChangeHour: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeMin: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  checked: boolean;
  hourValue: string;
  minutesValue: string;
  isAmpm: AmPmType;
}

export default function TimePicker({ hourValue, minutesValue, isAmpm, onChangeHour, onChangeMin, onSelectChange }: ITimePicker) {
  return (
    <div className={style["time-container"]}>
      <div className={style["time-text"]}>
        <select name="ampm" id="ampm" className={style.select} onChange={onSelectChange} defaultValue={isAmpm}>
          <option value="오전">오전</option>
          <option value="오후">오후</option>
        </select>
        <div className={style["input-time"]}>
          <div className={style.width}>
            <InputBox id="hour" type="number" variant="input-time" inputMode="numeric" pattern="[0-9]*" min="01" max="12" onChange={onChangeHour} value={hourValue} />
          </div>
          <p>:</p>
          <div className={style.width}>
            <InputBox id="minute" type="number" variant="input-time" inputMode="numeric" pattern="[0-9]*" min="00" max="59" onChange={onChangeMin} value={minutesValue} />
          </div>
        </div>
      </div>
    </div>
  );
}
