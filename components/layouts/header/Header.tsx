"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import Sidebar from "../sidebar/Sidebar";
import { isMobile } from "react-device-detect";

export default function Header() {
  const [name, setName] = useState("");
  const [isSideOpne, setIsSideOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (path === "/") {
      setName("TODO-LIST");
    } else if (path === "/diary") {
      setName("주간 일기");
    } else if (path === "/calendar") {
      setName("달력");
    } else if (path === "/mypage") {
      setName("내페이지");
    } else {
      setName("");
    }
  }, [[path]]);

  const handleSideOpen = () => {
    setIsSideOpen(true);
  };

  const handleSideClose = () => {
    setIsSideOpen(false);
  };

  return (
    <>
      {/* {isSideOpne ? <Sidebar onClick={handleSideClose} /> : null} */}
      <header>
        <p className="page-name">{name}</p>

        {/* <ul>
          <li>
            <p className="page-name">{name}</p>
          </li>
          {isMobile ? (
            <li>
              <Button isTxtBtn={false} existImg={true} src="/imgs/icons/ic_sidebar.svg" alt="검색" onClick={handleSideOpen} />
            </li>
          ) : null}
        </ul> */}
      </header>
    </>
  );
}
