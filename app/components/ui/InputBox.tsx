import { ChangeEventHandler } from "react";
import style from "../../../styles/components/ui/inputbox.module.scss";

interface IInput {
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  classNameKey?: keyof typeof style;
}

export default function InputBox({ placeholder, value, onChange, classNameKey }: IInput) {
  return (
    <div className={style["input-box"]}>
      <input
        type="text"
        name=""
        id=""
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${style["input"]} ${classNameKey ? style[classNameKey] : ""}`.trim()}
      />
    </div>
  );
}
