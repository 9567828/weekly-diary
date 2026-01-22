import DatePanel from "@/components/layouts/datepanel/DatePanel";
import TodoPanel from "./(todoPanel)/TodoPanel";
import WrapperLayout from "../../WrapperLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DatePanel children={<TodoPanel />} />
      <WrapperLayout>
        <article>{children}</article>
      </WrapperLayout>
    </>
  );
}
