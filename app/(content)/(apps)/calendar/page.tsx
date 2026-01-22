import DatePanel from "@/components/layouts/datepanel/DatePanel";
import CalendarPanel from "./(calendarPanel)/CalendarPanel";

export default function Page() {
  return (
    <>
      <DatePanel isMonthly>
        <CalendarPanel />
      </DatePanel>
    </>
  );
}
