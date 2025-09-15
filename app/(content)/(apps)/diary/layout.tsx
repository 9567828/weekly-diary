import DatePanel from "@/components/layouts/datepanel/DatePanel";
import DiaryPanel from "./(diaryPanel)/DiaryPanel";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DatePanel childern={<DiaryPanel />} />
      <div className="scroll-wrap diary">
        <article>{children}</article>
      </div>
    </>
  );
}
