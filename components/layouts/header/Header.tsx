"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./header.scss";

export default function Header() {
  const [name, setName] = useState("");
  const [isSideOpne, setIsSideOpen] = useState(false);
  const path = usePathname();
  const { date } = useParams();

  useEffect(() => {
    if (path === "/" || path === `/${String(date)}`) {
      setName("TODO-LIST");
    } else if (path.startsWith("/diary")) {
      setName("주간 일기");
    } else if (path.startsWith("/calendar")) {
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
      <header>
        <p className="page-name">{name}</p>
      </header>
    </>
  );
}
