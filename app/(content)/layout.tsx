import Header from "../../components/layouts/header/Header";
import Tabbar from "../../components/layouts/tabbar/Tabbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Tabbar />
    </>
  );
}
