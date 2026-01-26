import { RefObject } from "react";
import style from "./custom.module.scss";

export interface ITimerListProps {
  variant: "ampm" | "hour" | "min";
  list: string[];
  time: string;
  timeRef: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
}

export default function CustomTimerList({ variant, list, time, timeRef, onScroll }: ITimerListProps) {
  return (
    <div ref={timeRef} onScroll={onScroll} className={`${style["text-wrap"]} ${variant === "ampm" ? style.ampm : ""}`.trim()}>
      {list.map((t, i) => {
        const isFirst = i === 0;
        const isLast = i === list.length - 1;

        const isActive = time === t;
        const isNone = variant === "hour" || variant === "min" ? isFirst || isLast : i > 2 || i === 0;

        return (
          <div key={i} className={`${style["time-text"]} ${isNone ? style.none : ""} ${isActive ? style.active : ""}`.trim()}>
            {t}
          </div>
        );
      })}
    </div>
  );
}
