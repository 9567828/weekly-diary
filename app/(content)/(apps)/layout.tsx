import DatePanel from "@/components/layouts/datepanel/DatePanel";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DatePanel />
      <div className={"hidden"}>
        <article>{children}</article>
      </div>
    </>
  );
}
