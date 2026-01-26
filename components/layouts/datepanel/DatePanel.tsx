import style from "./datepanel.module.scss";

export default function DatePanel({ children }: { children: React.ReactNode }) {
  return <div className={style.panel}>{children}</div>;
}
