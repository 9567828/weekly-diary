import { ChangeEvent } from "react";
import style from "./radiobtn.module.scss";

interface IRadio {
  id: string;
  radioName: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioBtn({ id, label, radioName, onChange, checked }: IRadio) {
  return (
    <>
      <input type="radio" name={radioName} onChange={onChange} id={id} checked={checked} className={style["input-radio"]} />
      <label htmlFor={id} className={style.label}>
        {label}
      </label>
    </>
  );
}
