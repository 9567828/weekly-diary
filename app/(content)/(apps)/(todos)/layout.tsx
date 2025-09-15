import DatePanel from "@/components/layouts/datepanel/DatePanel";
import TodoPanel from "./(todoPanel)/TodoPanel";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DatePanel childern={<TodoPanel />} />
      <div className="scroll-wrap">
        <article>{children}</article>
      </div>
    </>
  );
}
