import Header from "../../components/layouts/header/Header";
import Tabbar from "../../components/layouts/tabbar/Tabbar";
import Sidebar from "../../components/layouts/sidebar/Sidebar";
import { isMobile } from "react-device-detect";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* {isMobile ? <Sidebar /> : null}
      <Header />
      <main className={isMobile ? "mobile" : undefined}>{children}</main>
      {isMobile ? null : <Tabbar />} */}
      <Header />
      <main>{children}</main>
      {/* <Tabbar /> */}
    </>
  );
}
