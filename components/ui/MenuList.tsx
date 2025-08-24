"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuList = [
  {
    href: "/",
    srcTab: "/imgs/icons/tabbar/new/todo.svg",
    srcTabActive: "/imgs/icons/tabbar/new/todo_active.svg",
    // srcTab: "/imgs/icons/tabbar/ic_todo.svg",
    // srcTabActive: "/imgs/icons/tabbar/ic_todo_active.svg",
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
    // srcTab: "/imgs/icons/tabbar/ic_calendar.svg",
    // srcTabActive: "/imgs/icons/tabbar/ic_calendar_active.svg",
    alt: "달력보기",
  },
  {
    href: "/mypage",
    srcTab: "/imgs/icons/tabbar/ic_user-24.svg",
    srcTabActive: "/imgs/icons/tabbar/ic_user-24_active.svg",
    // srcTab: "/imgs/icons/tabbar/ic_user.svg",
    // srcTabActive: "/imgs/icons/tabbar/ic_user_active.svg",

    alt: "투두메뉴",
  },
];

export default function MenuList() {
  const path = usePathname();

  return (
    <ul>
      {menuList.map((menu, i) => (
        <li key={i}>
          <Link href={menu.href}>
            <img src={path === menu.href ? menu.srcTabActive : menu.srcTab} alt={menu.alt} />
            {/* <p className="menu-name">{menu.menu}</p> */}
          </Link>
        </li>
      ))}
    </ul>
  );
}
