"use client";

import style from "./datepanel.module.scss";

export default function DatePanel({ childern }: { childern: React.ReactNode }) {
  return <div className={style.panel}>{childern}</div>;
}
