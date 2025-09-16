import DatePanel from "@/components/layouts/datepanel/DatePanel";
import CalendarPanel from "./(calendarPanel)/CalendarPanel";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DatePanel childern={<CalendarPanel />} />
      <div className="scroll-wrap calendar">
        <article>{children}</article>
      </div>
    </>
  );
}
