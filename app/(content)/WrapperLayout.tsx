"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";
import Header from "@/components/layouts/header/Header";
import DatePanel from "@/components/layouts/datepanel/DatePanel";

export default function WrapperLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { date } = useParams();

  const diary = path.startsWith("/diary");
  const calendar = path.startsWith("/calendar");
  const mypage = path.startsWith("/mypage");

  return (
    <div className={`scroll-wrap ${diary ? "diary" : calendar ? "calendar" : mypage ? "mypage" : ""}`.trim()}>
      {/* <div
      className={`scroll-wrap ${diary ? "diary" : calendar ? "calendar" : mypage ? "mypage" : ""} ${
        calendar ? (count === 4 ? "row4" : count === 5 ? "row5" : count === 6 ? "row6" : "") : ""
      }`.trim()}
    > */}
      {children}
    </div>
  );
}
