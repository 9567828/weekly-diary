import { ChangeEvent } from "react";
import style from "./toggle.module.scss";

interface IToggle {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export default function ToggleBtn({ id, onChange, checked }: IToggle) {
  return (
    <div>
      <input type="checkbox" id={id} hidden onChange={onChange} checked={checked} />
      <label htmlFor={id} className={`${style["toggle-btn"]} ${checked ? style.on : ""}`.trim()}>
        <span className={`${style["toggle-switch"]} ${checked ? style.on : ""}`.trim()}></span>
      </label>
    </div>
  );
}
