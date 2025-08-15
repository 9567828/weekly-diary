import DatePanel from "@/app/components/layouts/datepanel/DatePanel";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DatePanel />
      <article>{children}</article>
    </>
  );
}
