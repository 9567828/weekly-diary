import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  classNameKey?: string;
  variant: string;
  label?: string;
  children?: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function InputBox(
  { classNameKey, label, variant, children, onChange, value, ...rest }: IInput,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className={`input-box ${label ? "input-label-flex" : ""}`.trim()}>
      {label ? (
        <label htmlFor={rest.id} className="input-label">
          {label}
        </label>
      ) : null}
      <input
        {...rest}
        ref={ref}
        onChange={onChange}
        value={value}
        className={`${variant} ${classNameKey ? classNameKey : ""}`.trim()}
      />
      {children}
    </div>
  );
}

export default forwardRef<HTMLInputElement, IInput>(InputBox);
