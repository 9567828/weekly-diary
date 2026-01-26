export default function EmptySpace({ isCalendar = false, addMargin = false }: { isCalendar?: boolean; addMargin?: boolean }) {
  return <div className={`empty-space ${isCalendar && "calendar"} ${addMargin ? "mt" : ""}`.trim()}></div>;
}
