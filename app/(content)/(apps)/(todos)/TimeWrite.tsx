import { ChangeEvent, useEffect, useState } from "react";
import style from "./time.module.scss";
import RadioBtn from "../../../../components/ui/radioBtn/RadioBtn";
import InputBox from "../../../../components/ui/inputBox/InputBox";

export default function TimeWrite() {
  const [hour, setHour] = useState<number[]>([]);
  const [min, setMin] = useState<number[]>([]);
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={style["time-container"]}>
      <div className={style["radio-wrap"]}>
        <RadioBtn id="am" radioName="time-notation" label="오전" />
        <RadioBtn id="pm" radioName="time-notation" label="오후" />
      </div>
      <div className={style["time-text"]}>
        <div className={style.width}>
          <InputBox onChange={onChange} value="09" classNameKey={"input-time"} />
        </div>
        <p>:</p>
        <div className={style.width}>
          <InputBox onChange={onChange} value="25" classNameKey={"input-time"} />
        </div>
      </div>
    </div>
  );
}
