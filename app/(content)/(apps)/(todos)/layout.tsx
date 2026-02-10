export const dynamic = "force-dynamic";
export const revalidate = 0;

import DatePanel from "@/components/layouts/datepanel/DatePanel";
import TodoPanel from "./(todoPanel)/TodoPanel";
import WrapperLayout from "../../WrapperLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DatePanel>
        <TodoPanel />
      </DatePanel>
      <WrapperLayout>{children}</WrapperLayout>
    </>
  );
}
