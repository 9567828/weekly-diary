"use client";

import { ChangeEventHandler, ReactNode } from "react";
import style from "../../../styles/components/ui/checkbtn.module.scss";

interface ICheckBtn {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  children: ReactNode;
}

export default function CheckBtn({ id, onChange, checked, children }: ICheckBtn) {
  return (
    <>
      <input type="checkbox" className={style["square-check-box"]} id={id} onChange={onChange} checked={checked} />
      <label htmlFor={id}></label>
      <label htmlFor={id} className={style["meta"]}>
        {children}
      </label>
    </>
  );
}
