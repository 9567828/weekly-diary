"use client";

import Link from "next/link";
import "./tabbar.scss";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuList = [
  {
    href: "/",
    srcTab: "/imgs/icons/tabbar/new/todo.svg",
    srcTabActive: "/imgs/icons/tabbar/new/todo_active.svg",
    alt: "투두메뉴",
  },
  {
    href: "/diary",
    srcTab: "/imgs/icons/tabbar/new/diary.svg",
    srcTabActive: "/imgs/icons/tabbar/new/diary_active.svg",
    alt: "주간일기",
  },
  {
    href: "/calendar",
    srcTab: "/imgs/icons/tabbar/new/calendar.svg",
    srcTabActive: "/imgs/icons/tabbar/new/calendar_active.svg",
    alt: "달력보기",
  },
  {
    href: "/mypage",
    srcTab: "/imgs/icons/tabbar/ic_user-24.svg",
    srcTabActive: "/imgs/icons/tabbar/ic_user-24_active.svg",

    alt: "투두메뉴",
  },
];

export default function Tabbar() {
  const path = usePathname();
  const { date } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [hideTabbar, setHideTabbar] = useState(false);

  const homePath = path === "/" || path === `/${String(date)}`;

  const isActive = (menuHref: string) => {
    if (menuHref === "/") {
      return homePath;
    }
    return path.startsWith(menuHref);
  };

  useEffect(() => {
    let x;
    const onScroll = () => {
      x = window.innerWidth;
      if (x < 798) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable) {
        setHideTabbar(true);
      }
    };

    const handleFocusOut = () => {
      setHideTabbar(false);
    };

    window.addEventListener("focusin", handleFocus);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("focusin", handleFocus);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  console.log(hideTabbar);

  return (
    <footer className={isMobile && hideTabbar ? "none" : ""}>
      <ul>
        {menuList.map((menu, i) => (
          <li key={i}>
            <Link href={menu.href}>
              <img src={isActive(menu.href) ? menu.srcTabActive : menu.srcTab} alt={menu.alt} />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
