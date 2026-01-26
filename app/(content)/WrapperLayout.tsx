"use client";

import { useParams, usePathname } from "next/navigation";
import React from "react";
import Tabbar from "@/components/layouts/tabbar/Tabbar";

export default function WrapperLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const calendar = path.startsWith("/calendar");
  const mypage = path.startsWith("/mypage");

  return <article className={`${mypage ? "mypage" : calendar ? "calendar" : ""}`.trim()}>{children}</article>;
}
