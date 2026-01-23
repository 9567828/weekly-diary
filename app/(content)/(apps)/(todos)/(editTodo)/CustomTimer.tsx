"use client";

import style from "./custom.module.scss";

import { useSetInitialTime } from "@/hooks/useHooks";
import CustomTimerList, { ITimerListProps } from "./CustomTimerList";
import { useEffect } from "react";

interface ITimerProps {
  timer: ITimerListProps[];
  toggleTime: boolean;
}

export default function CustomTimer({ timer, toggleTime }: ITimerProps) {
  timer.map((t) => {
    useSetInitialTime(t.list, t.time, t.timeRef);
  });

  useEffect(() => {
    if (!toggleTime) {
      timer.map((t) => {
        useSetInitialTime(t.list, t.time, t.timeRef);
      });
    }
  }, [toggleTime]);

  return (
    <div className={style.container}>
      <div className={style["time-wrap"]}>
        {timer.map((t, i) => {
          return (
            <CustomTimerList
              key={i}
              variant={t.variant}
              timeRef={t.timeRef}
              time={t.time}
              list={t.list}
              onScroll={t.onScroll}
            />
          );
        })}
      </div>
    </div>
  );
}
