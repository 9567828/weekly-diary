"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [name, setName] = useState("");
  const path = usePathname();

  useEffect(() => {
    if (path === "/") {
      setName("TODO-LIST");
    } else if (path === "/weekly-diary") {
      setName("주간 일기");
    } else if (path === "/calender") {
      setName("달력");
    } else if (path === "/mypage") {
      setName("내페이지");
    } else {
      setName("");
    }
  }, [[path]]);

  return (
    <header>
      <ul>
        <li>
          <button>
            <img src="/imgs/icons/ic_arrow.svg" alt="뒤로가기버튼" />
          </button>
        </li>
        <li>
          <p className="page-name">{name}</p>
        </li>
        <li>
          <button>
            <img src="/imgs/icons/ic_search.svg" alt="검색하기" />
          </button>
        </li>
      </ul>
    </header>
  );
}
