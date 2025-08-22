"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuList } from "@/utils/menuList";

interface IMenu {
  isTab: boolean;
}

export default function MenuList({ isTab }: IMenu) {
  const path = usePathname();

  return (
    <ul>
      {menuList.map((menu, i) => (
        <li key={i}>
          <Link href={menu.href}>
            <img
              src={
                isTab
                  ? path === menu.href
                    ? menu.srcTabActive
                    : menu.srcTab
                  : path === menu.href
                  ? menu.srcSideActive
                  : menu.srcSide
              }
              alt={menu.alt}
            />
            <p className="menu-name">{menu.menu}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
