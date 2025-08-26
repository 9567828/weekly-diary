"use client";

import { ChangeEventHandler, ReactNode } from "react";
import style from "./checkbtn.module.scss";

interface ICheckBtn {
  id: string;
  shape?: "square" | "circle";
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  children?: ReactNode;
}

export default function CheckBtn({ id, shape = "square", onChange, checked, children }: ICheckBtn) {
  return (
    <>
      <input
        type="checkbox"
        className={`${shape === "square" ? style["square-check-box"] : style["circle-check-box"]}`}
        id={id}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id}></label>
      <label htmlFor={id} className={style["meta"]}>
        {children}
      </label>
    </>
  );
}
