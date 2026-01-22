import DatePanel from "@/components/layouts/datepanel/DatePanel";
import DiaryPanel from "./(diaryPanel)/DiaryPanel";
import WrapperLayout from "./../../WrapperLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DatePanel children={<DiaryPanel />} />
      <WrapperLayout>
        <article>{children}</article>
      </WrapperLayout>
    </>
  );
}
