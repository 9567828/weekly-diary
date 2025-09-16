"use client";

import DaysWrap from "../days-wrap/DaysWrap";
import style from "../calender.module.scss";
import { dateStr, drawMonth, makeWeekNum, today } from "../drawWeek";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MonthlyCal({ allWeeks }: { allWeeks: Date[][] }) {
  const path = usePathname();

  return (
    <div>
      <DaysWrap />
      <div>
        {allWeeks.map((w, i) => (
          <ul key={i} className={style["week-wrap"]}>
            {w.map((d, i) => {
              const weekNum = makeWeekNum(d);
              const date = d.getDate();
              const days = d.getDay();
              const todayStr = dateStr(today());

              return (
                <li key={i} className={`${style["date-box"]} ${todayStr === dateStr(d) ? style.today : ""}`.trim()}>
                  <Link href={``} className={`${days === 0 || days === 6 ? style.weekend : ""}`.trim()}>
                    {date}
                  </Link>
                  <span className={style.dot}></span>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
