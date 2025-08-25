import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  classNameKey?: string;
  variant: string;
  label?: string;
  children?: React.ReactNode;
}

export default function InputBox({ classNameKey, label, variant, children, ...rest }: IInput) {
  return (
    <div className={`input-box ${label ? "input-label-flex" : ""}`.trim()}>
      {label ? (
        <label htmlFor={rest.id} className="input-label">
          {label}
        </label>
      ) : null}
      <input {...rest} className={`${variant} ${classNameKey ? classNameKey : ""}`.trim()} />
      {children}
    </div>
  );
}
