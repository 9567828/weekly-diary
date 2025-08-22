import style from "./radiobtn.module.scss";

interface IRadio {
  id: string;
  radioName: string;
  label: string;
}

export default function RadioBtn({ id, label, radioName }: IRadio) {
  return (
    <div className={style["time-container"]}>
      <input type="radio" name={radioName} id={id} className={style["input-radio"]} />
      <label htmlFor={id} className={style.label}>
        {label}
      </label>
    </div>
  );
}
