"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useEffect } from "react";

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

export default function MenuList() {
  const path = usePathname();
  const { date } = useParams();

  const homePath = path === "/" || path === `/${date}`;

  console.log("true?", homePath);

  useEffect(() => {
    console.log("DEBUG path:", path);
    console.log("DEBUG params:", date);
    console.log("DEBUG compare:", `/${date}`);
    console.log("DEBUG homePath:", path === "/" || path === `/${date}`);
  }, [path, date]);

  const isActive = (href: string, srcAc: string, src: string) => {
    if (path === href) {
      return srcAc;
    } else if (homePath) {
      return "/imgs/icons/tabbar/new/todo_active.svg";
    } else if (!homePath) {
      return "/imgs/icons/tabbar/new/todo.svg";
    } else {
      return src;
    }
  };

  return (
    <ul>
      {menuList.map((menu, i) => (
        <li key={i}>
          <Link href={menu.href}>
            <img src={isActive(menu.href, menu.srcTabActive, menu.srcTab)} alt={menu.alt} />
            {/* <img src={path === menu.href ? menu.srcTabActive : menu.srcTab} alt={menu.alt} /> */}
            {/* <p className="menu-name">{menu.menu}</p> */}
          </Link>
        </li>
      ))}
    </ul>
  );
}
