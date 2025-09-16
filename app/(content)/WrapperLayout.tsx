"use client";

import { useAppSelector } from "@/lib/hooks";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function WrapperLayout({ children }: { children: React.ReactNode }) {
  const count = useAppSelector((state) => state.diaries.weekCount);
  const path = usePathname();
  const { date } = useParams();

  const homePath = path === "/" || path.startsWith(`/${String(date)}`);
  const diary = path.startsWith("/diary");
  const calendar = path.startsWith("/calendar");
  const mypage = path.startsWith("/mypage");

  return (
    <div
      className={`scroll-wrap ${diary ? "diary" : calendar ? "calendar" : mypage ? "mypage" : ""} ${
        calendar ? (count === 4 ? "row4" : count === 5 ? "row5" : count === 6 ? "row6" : "") : ""
      }`.trim()}
    >
      {children}
    </div>
  );
}
