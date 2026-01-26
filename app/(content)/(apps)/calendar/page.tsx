import WrapperLayout from "../../WrapperLayout";
import CalendarPanel from "./(calendarPanel)/CalendarPanel";
import CalendarCover from "@/app/(content)/(apps)/calendar/(calendarPanel)/CalendarCover";

export default function Page() {
  return (
    <WrapperLayout>
      <CalendarCover />
      <CalendarPanel />
    </WrapperLayout>
  );
}
