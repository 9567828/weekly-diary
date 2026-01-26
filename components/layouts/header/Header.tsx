"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./header.scss";

export default function Header() {
  const [name, setName] = useState("");
  const path = usePathname();
  const { date } = useParams();

  const calendar = path.startsWith("/calendar");
  const myPage = path.startsWith("/mypage");

  useEffect(() => {
    if (path === "/" || path === `/${String(date)}`) {
      setName("TODO-LIST");
    } else if (path.startsWith("/diary")) {
      setName("주간 일기");
    } else if (calendar) {
      setName("달력 (주간일기)");
    } else if (myPage) {
      setName("내페이지");
    } else {
      setName("");
    }
  }, [[path]]);

  const headFiexd = calendar || myPage ? "fixed" : "";

  return (
    <>
      <header className={headFiexd}>
        <p className="page-name">{name}</p>
      </header>
    </>
  );
}
