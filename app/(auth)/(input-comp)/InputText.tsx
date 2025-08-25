import style from "./inputtxt.module.scss";
import InputBox from "../../../components/ui/InputBox";
import { InputHTMLAttributes } from "react";
import ErrorMsg from "../../../components/error-msg/ErrorMsg";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant: string;
  errorTxt?: string;
  className?: string;
}

export default function InputText({ label, variant, errorTxt, className, ...rest }: IInput) {
  return (
    <div className="input-wrap">
      <InputBox variant={variant} label={label} {...rest} />
      {errorTxt ? <ErrorMsg text={errorTxt} className={className} /> : null}
    </div>
  );
}
