import DatePanel from "../components/layouts/datepanel/DatePanel";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article>
      <DatePanel />
      {children}
    </article>
  );
}
