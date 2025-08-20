import { ChangeEvent } from "react";
import style from "../../../styles/components/ui/toggle.module.scss";

interface IToggle {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  on: boolean;
}

export default function ToggleBtn({ id, onChange, on }: IToggle) {
  return (
    <div>
      <input type="checkbox" id={id} hidden onChange={onChange} checked={on} />
      <label htmlFor={id} className={`${style["toggle-btn"]} ${on ? style.on : ""}`.trim()}>
        <span className={`${style["toggle-switch"]} ${on ? style.on : ""}`.trim()}></span>
      </label>
    </div>
  );
}
