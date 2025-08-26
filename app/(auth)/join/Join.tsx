"use client";

import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import InputText from "../(input-comp)/InputText";
import FormLayout from "../(form-comp)/FormLayout";
import { onChangeEmail, onChangePhone, onChangeRegex, pwRegex } from "@/utils/regex";
import { vaildateCheck } from "@/utils/valueCheck";

export default function Join() {
  const [emailId, setEmailId] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassWord] = useState("");
  const [isPw, setIsPw] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState({
    email: { isError: false, msg: "" },
    phone: { isError: false, msg: "" },
    password: { isError: false, msg: "" },
    confirmPassword: { isError: false, msg: "" },
  });

  const validators = {
    email: (value: string) => {
      if (value === "") return "이메일 아이디를 입력해 주세요";
      if (!isEmail) return "이메일 형식이 맞지 않습니다.";
      return "";
    },
    phone: (value: string) => {
      if (value === "") return "전화번호를 입력해 주세요";
      return "";
    },
    password: (value: string) => {
      if (value === "") return "비밀번호를 입력해 주세요";
      if (!isPw) return "비밀번호는 8자 영문+숫자 조합입니다";
      if (isPw) return "";
      // if (isPw) return "🔹 비밀번호는 8자 영문+숫자 조합입니다";
      return "";
    },
    confirmPassword: (value: string) => {
      if (isPw) {
        if (value === "") return "비밀번호 확인을 입력해 주세요";
        if (password !== passwordConfirm) return "입력하신 비밀번호와 일치하지 않습니다";
        if (password === passwordConfirm) return "";
        // if (password === passwordConfirm) return "🔹 비밀번호 일치";
      }
      return "";
    },
  } as const;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") setPassWord(value);
    if (name === "confirmPassword") setPasswordConfirm(value);
  };

  const onBlurCheck = (e: FocusEvent<HTMLInputElement>) => {
    vaildateCheck(e, validators, setError);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    (Object.keys(validators) as (keyof typeof validators)[]).forEach((key) => {
      const value = key === "email" ? emailId : key === "phone" ? phone : key === "password" ? password : passwordConfirm;

      const msg = validators[key](value);
      setError((prev) => ({
        ...prev,
        [key]: { isError: msg !== "", msg },
      }));
    });
  };

  return (
    <>
      <FormLayout pageTitle="회원가입" btnLabel="가입" onSubmit={onSubmit} disabled={emailId === ""}>
        <InputText
          whichInput="email"
          onChange={(e) => onChangeEmail(e, setEmailId, setIsEmail)}
          value={emailId}
          isError={error.email.isError}
          errorTxt={error.email.msg}
          onBlur={onBlurCheck}
        />
        <InputText
          whichInput="phone"
          onChange={(e) => onChangePhone(e, setPhone)}
          value={phone}
          isError={error.phone.isError}
          errorTxt={error.phone.msg}
          onBlur={onBlurCheck}
        />
        <InputText
          whichInput="password"
          onChange={(e) => onChangeRegex(e, setPassWord, setIsPw, pwRegex)}
          value={password}
          isError={error.password.isError}
          errorTxt={error.password.msg}
          onBlur={onBlurCheck}
          inform={isPw ? "" : "비밀번호는 8자 이상 영문+숫자 조합으로 입력하세요"}
          informClassName={"inform"}
        />
        <InputText
          whichInput="confirmPw"
          onChange={onChange}
          value={passwordConfirm}
          isError={error.confirmPassword.isError}
          errorTxt={error.confirmPassword.msg}
          onBlur={onBlurCheck}
        />
      </FormLayout>
    </>
  );
}
