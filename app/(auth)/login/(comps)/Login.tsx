"use client";

import style from "./login.module.scss";
import InputBox from "../../../../components/ui/InputBox";
import { ChangeEvent, useState } from "react";
import ErrorMsg from "../../../../components/error-msg/ErrorMsg";
import Link from "next/link";
import Button from "../../../../components/ui/Button";
import CheckBtn from "../../../../components/ui/checkBtn/CheckBtn";
import { signInWithGoogle } from "@/utils/supabase/auth";

export default function Login() {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [isIdFocus, setIsIdFocus] = useState(false);
  const [isPwFocus, setIsPwFocus] = useState(false);
  const [checkAuto, setCheckAuto] = useState(false);

  const onIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.currentTarget.value);
  };

  const onPwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.currentTarget.value);
  };

  const onLoingGoogle = () => {
    try {
      const data = signInWithGoogle();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={style.head}>
        <img src="/imgs/pencil-.svg" alt="아이콘" />
        {/* <img src="/imgs/pencil.svg" alt="아이콘" /> */}
        {/* <img src="/imgs/icons/ic_complete.svg" alt="아이콘" /> */}
        <h1 className={style.headTitle}>weekly plan</h1>
      </div>
      <div className={style["login-wrap"]}>
        <div>
          <form action="" id="loginForm" className="form-container">
            <div className="input-wrap">
              <InputBox
                id="inputId"
                onChange={onIdChange}
                value={idValue}
                variant={"border-login"}
                onFocus={() => setIsIdFocus(true)}
                onBlur={() => setIsIdFocus(false)}
              >
                <label htmlFor="inputId" className={`${style.label} ${isIdFocus || idValue ? style.focus : ""}`.trim()}>
                  이메일 아이디
                </label>
              </InputBox>
              <ErrorMsg text="아이디 또는 비밀번호를 확인해 주세요" />
            </div>
            <div className="input-wrap">
              <InputBox
                id="inputPW"
                onChange={onPwChange}
                value={pwValue}
                variant={"border-login"}
                onFocus={() => setIsPwFocus(true)}
                onBlur={() => setIsPwFocus(false)}
              >
                <label htmlFor="inputPW" className={`${style.label} ${isPwFocus || pwValue ? style.focus : ""}`.trim()}>
                  비밀번호
                </label>
              </InputBox>
            </div>
          </form>
          <div className={style["account-meta-wrap"]}>
            <div className={style["auto-login"]}>
              <CheckBtn id="autoLogin" shape="circle" onChange={(e) => setCheckAuto(e.target.checked)} checked={checkAuto}>
                <p>자동로그인</p>
              </CheckBtn>
            </div>

            <div>
              <Link href={"/find-id"} className={style["col-line"]}>
                아이디찾기
              </Link>
              <Link href={"/find-pw"}>비밀번호찾기</Link>
            </div>
          </div>
        </div>

        <div className={style["btn-wrap"]}>
          <Button type="submit" label="로그인" variant="primary-btn" />
          <Button
            existImg={true}
            src="/imgs/icons/Google.svg"
            alt="구글로그인"
            label="구글 로그인"
            variant="google-btn"
            onClick={onLoingGoogle}
          />
        </div>
      </div>
      <Link href={"/join"} className={style["join-link"]}>
        회원가입
      </Link>
    </>
  );
}
