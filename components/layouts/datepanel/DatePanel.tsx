import style from "./datepanel.module.scss";

export default function DatePanel({ children, isMonthly = false }: { isMonthly?: boolean; children: React.ReactNode }) {
  return <div className={`${style.panel} ${isMonthly ? style.month : ""}`.trim()}>{children}</div>;
}
