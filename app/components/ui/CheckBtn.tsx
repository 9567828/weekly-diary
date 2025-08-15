"use client";

import { ReactNode } from "react";
import style from "../../../styles/components/ui/checkbtn.module.scss";

interface ICheckBtn {
  id: string;
  // label: string;
  children: ReactNode;
}

// type RequiredTimeProp = {
//   isTime: true;
//   time: string;
// };

// type OptionalTimeProp = {
//   isTime: false;
//   time?: never;
// };

// type Props = ICheckBtn & (RequiredTimeProp | OptionalTimeProp);

export default function CheckBtn({ id, children }: ICheckBtn) {
  return (
    <div className={style["flex"]}>
      <input type="checkbox" className={style["square-check-box"]} id={id} />
      <label htmlFor={id}></label>
      <label htmlFor={id} className={style["meta"]}>
        {/* <p className={style["label"]}>{label}</p>
        {isTime ? (
          <div className={style["time-line"]}>
            <img src="/imgs/icons/ic_clock.svg" alt="시간" />
            <p className={style["time"]}>{time}</p>
          </div>
        ) : null} */}
        {children}
      </label>
    </div>
  );
}
