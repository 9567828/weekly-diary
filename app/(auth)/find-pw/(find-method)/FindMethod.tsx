"use client";

import style from "./findmethod.module.scss";
import Button from "../../../../components/ui/Button";
import FormLayout from "../../(form-comp)/FormLayout";
import { FormEvent, useEffect, useState } from "react";
import InputText from "../../(input-comp)/InputText";
import { onChangeEmail, onChangePhone } from "@/utils/regex";

export default function FindMethod() {
  const [method, setMethod] = useState<"id" | "phone">("id");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (method === "id") {
      // 이메일 체크
      if (email === "") {
        setIsError(true);
        setErrorTxt("이메일을 입력해 주세요");
        return;
      } else if (!isEmail) {
        setIsError(true);
        setErrorTxt("이메일을 형식이 아닙니다");
        return;
      } else {
        setIsError(true);
        setErrorTxt("");
      }
    } else if (method === "phone") {
      // 전화번호로 체크
      if (phone === "") {
        setIsError(true);
        setErrorTxt("전화번호를 입력해 주세요");
      }
    }
  };

  useEffect(() => {
    setIsError(false);
    setErrorTxt("");
  }, [method]);

  return (
    <>
      <FormLayout onSubmit={onSubmit} btnLabel="확인" pageTitle="비밀번호 찾기">
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
        {method === "id" ? (
          <InputText
            whichInput="email"
            value={email}
            onChange={(e) => onChangeEmail(e, setEmail, setIsEmail)}
            isError={isError}
            errorTxt={errorTxt}
          />
        ) : method === "phone" ? (
          <InputText
            whichInput="phone"
            value={phone}
            onChange={(e) => onChangePhone(e, setPhone)}
            maxLength={13}
            label="전화번호"
            isError={isError}
            errorTxt={errorTxt}
          />
        ) : null}
      </FormLayout>
    </>
  );
}
