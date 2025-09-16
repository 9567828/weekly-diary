import DatePanel from "@/components/layouts/datepanel/DatePanel";
import CalendarPanel from "./(calendarPanel)/CalendarPanel";
import WrapperLayout from "../../WrapperLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DatePanel childern={<CalendarPanel />} />
      <WrapperLayout>
        <article>{children}</article>
      </WrapperLayout>
    </>
  );
}
