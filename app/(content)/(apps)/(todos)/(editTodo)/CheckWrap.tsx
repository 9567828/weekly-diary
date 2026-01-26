import { ChangeEvent } from "react";
import style from "./custom.module.scss";
import CheckBtn from "@/components/ui/checkBtn/CheckBtn";
import InputDate from "@/components/ui/InputDate";
import { todayStr } from "@/components/calendar/drawWeek";

interface ICheckProps {
  mode: "date" | "nomal";
  id: string;
  text: string;
  checked: boolean;
  onChangeChecked: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onChangeDate?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckWrap({ mode, id, text, checked, onChangeChecked, value, onChangeDate }: ICheckProps) {
  return (
    <div className={`${mode === "date" ? style["until-container"] : style.nomal}`.trim()}>
      <div className={style["check-wrap"]}>
        <CheckBtn id={id} onChange={onChangeChecked} checked={checked}>
          {text}
        </CheckBtn>
      </div>
      {mode === "date" && checked && <InputDate id="untilDate" value={value || todayStr()} onChange={onChangeDate} />}
    </div>
  );
}
