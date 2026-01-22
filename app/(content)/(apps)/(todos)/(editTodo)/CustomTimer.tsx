"use client";

import style from "./custom.module.scss";

import { useSetInitialTime } from "@/hooks/useHooks";
import CustomTimerList, { ITimerListProps } from "./CustomTimerList";

interface ITimerPorps {
  timer: ITimerListProps[];
}

export default function CustomTimer({ timer }: ITimerPorps) {
  timer.map((t) => {
    useSetInitialTime(t.list, t.time, t.timeRef);
  });

  return (
    <div className={style.container}>
      <div className={style["time-wrap"]}>
        <div className={`${style.dim} ${style.top}`}></div>
        {timer.map((t, i) => {
          return (
            <CustomTimerList key={i} variant={t.variant} timeRef={t.timeRef} time={t.time} list={t.list} onScroll={t.onScroll} />
          );
        })}

        <div className={`${style.dim} ${style.bottom}`}></div>
      </div>
    </div>
  );
}
