import { RefObject, TouchEvent, useEffect, useRef, useState } from "react";
import style from "./custom.module.scss";
import { useIsAndroid, useSetInitialTime } from "@/hooks/useHooks";

export type TimeType = "ampm" | "hour" | "min";

export interface ITimerListProps {
  variant: TimeType;
  list: string[];
  time: string;
  timeRef: RefObject<HTMLDivElement | null>;
  toggleTime: boolean;
}

export default function CustomTimerList({ variant, list, time, timeRef, toggleTime }: ITimerListProps) {
  const [touchY, setTouchY] = useState(0);
  const [tranfrom, setTransform] = useState(0);

  const itemRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchY(e.changedTouches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const el = timeRef.current;
    if (!el) return;

    console.log(el);

    const ITEM_HEIGHT = 50;
    const baseOffset = 50;

    const deltaY = e.changedTouches[0].clientY - touchY;
    const step = Math.round(deltaY / ITEM_HEIGHT);

    const translateY = baseOffset - step * ITEM_HEIGHT;

    console.log(step, translateY);
  };

  const handleTouchCancel = () => {};

  const handleInitTime = () => {
    useSetInitialTime(list, time, timeRef);
  };

  handleInitTime();

  useEffect(() => {
    if (!toggleTime) {
      handleInitTime();
    }
  }, [toggleTime]);

  return (
    <div
      ref={timeRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      className={`${style["text-wrap"]} ${variant === "ampm" ? style.ampm : ""}`.trim()}
      style={tranfrom < 0 ? { transform: `translaste3d(0, ${tranfrom}px, 0)` } : undefined}
    >
      {list.map((t, i) => {
        const isActive = time === t;

        return (
          <div key={i} ref={itemRef} className={`${style["time-text"]} ${isActive ? style.active : ""}`.trim()}>
            {t}
          </div>
        );
      })}
    </div>
  );
}
