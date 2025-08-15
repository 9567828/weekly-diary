"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuList = [
  {
    menu: "TODO",
    href: "/",
    src: "/imgs/icons/tabbar/ic_todo.svg",
    alt: "투두메뉴",
    srcActive: "/imgs/icons/tabbar/ic_todo_active.svg",
  },
  {
    menu: "일기",
    href: "/weekly-diary",
    src: "/imgs/icons/tabbar/ic_diary.svg",
    alt: "주간일기",
    srcActive: "/imgs/icons/tabbar/ic_diary_active.svg",
  },
  {
    menu: "달력",
    href: "/calender",
    src: "/imgs/icons/tabbar/ic_calender.svg",
    alt: "달력보기",
    srcActive: "/imgs/icons/tabbar/ic_calender_active.svg",
  },
  {
    menu: "내페이지",
    href: "/mypage",
    src: "/imgs/icons/tabbar/ic_user.svg",
    alt: "투두메뉴",
    srcActive: "/imgs/icons/tabbar/ic_user_active.svg",
  },
];

export default function Tabbar() {
  const path = usePathname();

  return (
    <footer>
      <ul>
        {menuList.map((menu, i) => (
          <li key={i}>
            <Link href={menu.href}>
              <img src={path === menu.href ? menu.srcActive : menu.src} alt={menu.alt} />
              <p className="menu-name">{menu.menu}</p>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
