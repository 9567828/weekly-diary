import style from "./custom.module.scss";
import CustomTimerList, { TimeType } from "./CustomTimerList";
import { RefObject } from "react";

type ITimeconfig = {
  variant: TimeType;
  list: string[];
  time: string;
  timeRef: RefObject<HTMLDivElement | null>;
};

interface ITimerProps {
  config: ITimeconfig[];
  toggleTime: boolean;
}

export default function CustomTimer({ config, toggleTime }: ITimerProps) {
  return (
    <div className={style.container}>
      <div className={style["time-wrap"]}>
        {config.map((t, i) => {
          return <CustomTimerList key={i} variant={t.variant} timeRef={t.timeRef} time={t.time} list={t.list} toggleTime={toggleTime} />;
        })}
      </div>
    </div>
  );
}
