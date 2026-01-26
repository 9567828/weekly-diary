import { useState, useRef } from "react";
import style from "./select.module.scss";
import { RepeatMapType, RepeatType } from "@/utils/supabase";
import { useOnClickOutSide } from "@/hooks/useHooks";

const optionList: RepeatMapType[] = [
  { label: "안함", value: "none" },
  { label: "매일", value: "daily" },
  { label: "평일", value: "weekday" },
  { label: "주말", value: "weekend" },
  { label: "매주", value: "weekly" },
  { label: "격주", value: "biweekly" },
  { label: "매월", value: "monthly" },
];

export default function SelectRepeat({ type, onSelect }: { type: RepeatMapType; onSelect: (v: RepeatMapType) => void }) {
  const [open, setOpen] = useState(false);

  const selRef = useRef<HTMLDivElement>(null);

  useOnClickOutSide(selRef, () => setOpen(false));

  const handleSelect = (opt: RepeatMapType) => {
    onSelect(opt);
    setOpen(false);
  };

  return (
    <div ref={selRef} className={style["select-box"]}>
      <button type="button" className={`${style.default} ${style["repeat-btn"]}`} onClick={() => setOpen(!open)}>
        <span>{type.value === "biweekly" ? "격주" : type.label}</span>
        <img src="/imgs/icons/ic_Arrow_Unfold_More.svg" alt="" />
      </button>
      {open && (
        <ul className={style["opt-wrap"]}>
          {optionList.map((r: RepeatMapType) => (
            <li
              key={r.value}
              className={`${style.default} ${style["opt-item"]} ${type.value === r.value ? style.active : ""}`.trim()}
              onClick={() => handleSelect({ value: r.value, label: r.label })}
            >
              <span>{r.label}</span>
              <img src="/imgs/icons/ic_Unread.svg" alt="선택" className={style.checked} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
