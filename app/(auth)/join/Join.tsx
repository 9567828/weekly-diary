"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import InputText from "../(input-comp)/InputText";
import { useRouter } from "next/navigation";
import FormLayout from "../(form-comp)/FormLayout";

export default function Join() {
  const router = useRouter();

  const [idValue, setIdValue] = useState("");
  const [phonValue, setPhoneValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [pwConfrim, setPwConfirm] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
  };

  const onBtnClick = () => {
    console.log();
  };

  return (
    <>
      <FormLayout pageTitle="회원가입" btnLabel="가입" btnClick={onBtnClick} onSubmit={onSubmit} disabled={idValue === ""}>
        <InputText
          id="inputId"
          label="아이디"
          onChange={onChange}
          value={idValue}
          variant="input-border"
          placeholder="이메일형식 아이디"
          errorTxt="입력하세요"
        />
        <InputText
          id="inputPhone"
          label="전화번호"
          onChange={onChange}
          value={phonValue}
          variant="input-border"
          placeholder="010-1234-5678"
          errorTxt="입력하세요"
        />
        <InputText
          id="inputPw"
          onChange={onChange}
          value={pwValue}
          variant="input-border"
          placeholder="비밀번호를 입력하세요"
          errorTxt="입력하세요"
        />
        <InputText
          id="inputPwConfirm"
          onChange={onChange}
          value={pwConfrim}
          variant="input-border"
          placeholder="비밀번호 확인"
          errorTxt="입력하세요"
        />
      </FormLayout>
    </>
  );
}
