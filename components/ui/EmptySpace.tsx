export default function EmptySpace({ isCalendar = false }: { isCalendar?: boolean }) {
  return <div className={`empty-space ${isCalendar && "calendar"}`.trim()}></div>;
}
