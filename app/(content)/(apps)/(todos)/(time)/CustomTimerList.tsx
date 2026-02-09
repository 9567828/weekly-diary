import { RefObject, TouchEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "./time.module.scss";

export type TimeType = "ampm" | "hour" | "min";

export interface ITimerListProps {
  variant: TimeType;
  list: string[];
  time: string;
  timeRef: RefObject<HTMLDivElement | null>;
  toggleTime: boolean;
  getTimeFn: (time: string) => void;
}

export default function CustomTimerList({ variant, list, time, timeRef, toggleTime, getTimeFn }: ITimerListProps) {
  const ITEM_HEIGHT = 50;
  const itemCount = list.length;
  const MAX = ITEM_HEIGHT;
  const MIN = variant === "ampm" ? 0 : -(itemCount - 2) * ITEM_HEIGHT;
  const RESISTANCE = 0.5;
  const baseTranslateY = useRef(50);

  const [touchY, setTouchY] = useState(0);

  const itemRef = useRef<HTMLDivElement>(null);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchY(e.changedTouches[0].clientY);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const el = timeRef.current;
    if (!el) return;

    const deltaY = e.changedTouches[0].clientY - touchY;
    let nextTranslate = baseTranslateY.current + deltaY;

    if (nextTranslate > MAX) {
      nextTranslate = MAX + (nextTranslate - MAX) * RESISTANCE;
    }

    if (nextTranslate < MIN) {
      nextTranslate = MIN + (nextTranslate - MIN) * RESISTANCE;
    }

    el.style.transform = `translate3d(0, ${nextTranslate}px, 0)`;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const el = timeRef.current;
    if (!el) return;

    const deltaY = e.changedTouches[0].clientY - touchY;
    const step = Math.round(deltaY / ITEM_HEIGHT);

    let finalTranslateY = baseTranslateY.current + step * ITEM_HEIGHT;

    finalTranslateY = Math.max(MIN, Math.min(finalTranslateY, MAX));

    baseTranslateY.current = finalTranslateY;

    const activeIndex = Math.round((MAX - finalTranslateY) / ITEM_HEIGHT);

    el.style.transform = `translate3d(0, ${finalTranslateY}px, 0)`;
    if (variant === "ampm") {
      getTimeFn(activeIndex === 0 ? "오전" : "오후");
    } else if (variant === "hour") {
      getTimeFn(`${activeIndex + 1}`.padStart(2, "0"));
    } else {
      getTimeFn(`${activeIndex}`.padStart(2, "0"));
    }
  };

  const onTouchCancel = () => {};

  const handleInitTime = () => {
    const renderIndex = list.indexOf(time);

    useLayoutEffect(() => {
      const el = timeRef.current;
      if (!el) return;

      let translate;

      if (variant === "ampm") {
        if (renderIndex === 0) {
          translate = 50;
        } else {
          translate = 0;
        }
      } else {
        translate = -renderIndex * ITEM_HEIGHT + 50;
      }

      el.style.transform = `translate3d(0, ${translate}px, 0)`;
    }, [time, list]);
  };

  handleInitTime();

  useEffect(() => {
    if (!toggleTime) {
      handleInitTime();
    }
  }, [toggleTime]);

  return (
    <div ref={timeRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onTouchCancel={onTouchCancel} className={style["box-wrap"]}>
      {list.map((t, i) => {
        const isActive = time === t;

        return (
          <div key={i} ref={itemRef} className={`${style["time-box"]} ${isActive ? style.active : ""}`.trim()}>
            {t}
          </div>
        );
      })}
    </div>
  );
}
