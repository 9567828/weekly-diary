import InputBox from "../../../components/ui/InputBox";
import { ChangeEvent, InputHTMLAttributes } from "react";
import ErrorMsg from "../../../components/error-msg/ErrorMsg";

const inputPresets = {
  email: {
    id: "inputId",
    name: "email",
    placeholder: "이메일형식 아이디 입력",
    label: "아이디",
    autoComplete: "email",
  },
  phone: {
    id: "inputPhone",
    name: "phone",
    type: "tel",
    placeholder: "010-1234-5678",
    label: "전화번호",
    autoComplete: "tel",
    maxLength: 13,
  },
  password: {
    id: "inputPw",
    type: "password",
    name: "password",
    placeholder: "비밀번호 입력",
    autoComplete: "new-password",
  },
  confirmPw: {
    id: "inputConfirmPw",
    type: "password",
    name: "confirmPassword",
    placeholder: "비밀번호 확인 입력",
    autoComplete: "new-password",
  },
} as const;

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  whichInput?: "default" | keyof typeof inputPresets;
  label?: string;
  isError?: boolean;
  errorTxt?: string;
  inform?: string;
  className?: string;
  informClassName?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function InputText({
  whichInput = "default",
  label,
  isError,
  errorTxt,
  inform,
  className,
  informClassName,
  onChange,
  value,
  ...rest
}: IInput) {
  const preset = whichInput === "default" ? {} : inputPresets[whichInput];

  return (
    <div className="input-wrap">
      <InputBox {...preset} onChange={onChange} value={value} variant={"input-border"} {...rest} />
      {isError ? (
        <ErrorMsg text={errorTxt} className={className} />
      ) : inform ? (
        <ErrorMsg text={inform} className={informClassName} />
      ) : null}
    </div>
  );
}
