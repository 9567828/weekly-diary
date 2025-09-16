"use client";

import { useEffect } from "react";

export default function VersionChecker() {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch("/version.json?cache=" + Date.now());
        const data = await res.json();
        const latest = data.version;
        const current = localStorage.getItem("app-version");

        if (current && current !== latest) {
          localStorage.setItem("app-version", latest);
          window.location.reload;
        } else {
          localStorage.setItem("app-version", latest);
        }
      } catch (err) {
        console.error("버전체크실패: ", err);
      }
    };

    checkVersion();
  }, []);

  return null;
}
