"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import FormLayout from "../(form-comp)/FormLayout";
import InputText from "../(input-comp)/InputText";
import AccountFormBtn from "@/components/layouts/account-form-btn/AccountFormBtns";
import style from "./findId.module.scss";
import { useRouter } from "next/navigation";

export default function FindId() {
  const router = useRouter();
  const [isDone, setIsDone] = useState(false);
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
  };

  return (
    <>
      {!isDone ? (
        <FormLayout pageTitle={isDone ? "아이디찾기 결과" : "아이디찾기"} onSubmit={onSubmit} btnLabel="확인">
          <InputText
            whichInput="phone"
            errorTxt="가입시 입력한 핸드폰 번호를 입력해 주세요."
            className="inform"
            value={value}
            onChange={onChange}
          />
        </FormLayout>
      ) : (
        <>
          <div className={style["result"]}>
            <p>1234@naver.com</p>
            <p>가입일: 2025.01.12</p>
          </div>
          <AccountFormBtn label="로그인 하러가기" onClick={() => router.push("/login")} />
        </>
      )}
    </>
  );
}
