import { ChangeEventHandler, MouseEvent, FocusEventHandler } from "react";
import style from "./inputbox.module.scss";

interface IInput {
  placeholder?: string;
  value: string;
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  classNameKey?: keyof typeof style;
  variant: keyof typeof style;
  maxLength?: number;
  id?: string;
  name?: string;
  isReadOnly?: boolean;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export default function InputBox({
  id,
  name,
  placeholder,
  value,
  maxLength,
  onChange,
  classNameKey,
  variant,
  isReadOnly,
  onClick,
  children,
  onFocus,
  onBlur,
}: IInput) {
  return (
    <div className={style["input-box"]}>
      <input
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        className={`${style[variant]} ${classNameKey ? style[classNameKey] : ""}`.trim()}
        maxLength={maxLength}
        readOnly={isReadOnly}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {children}
    </div>
  );
}
