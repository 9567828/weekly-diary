"use client";

import style from "./findmethod.module.scss";
import Button from "../../../../components/ui/Button";
import FormLayout from "../../(form-comp)/FormLayout";
import { FormEvent, useState } from "react";
import InputText from "../../(input-comp)/InputText";

export default function FindMethod() {
  const [clickid, setClickId] = useState(true);
  const [clickPhone, setClickPhone] = useState(false);
  const [method, setMethod] = useState<"id" | "phone">("id");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
  };

  const onBtnClick = () => {
    console.log();
  };

  return (
    <>
      <FormLayout onSubmit={onSubmit} btnLabel="확인" pageTitle="비밀번호 찾기" btnClick={onBtnClick}>
        <div className={style["group"]}>
          <Button
            type="button"
            id="useId"
            label="아이디로 찾기"
            variant="find-method"
            onClick={() => setMethod("id")}
            className={method === "id" ? "active" : ""}
          />
          <Button
            type="button"
            id="usePhone"
            label="핸드폰번호로 찾기"
            variant="find-method"
            onClick={() => setMethod("phone")}
            className={method === "phone" ? "active" : ""}
          />
        </div>
        <InputText variant="input-border" placeholder="이메일형식 아이디 입력" label="아이디" errorTxt="아이디" />
      </FormLayout>
    </>
  );
}
