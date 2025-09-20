"use client";

import { useEffect, useState } from "react";

export default function VersionChecker() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch("/version.json?cache=" + Date.now());

        if (!res.ok) {
          console.warn("version.json 없음, dev 환경일 수 있음");
          setLoading(false);
          return;
        }

        const contentType = res.headers.get("content-type");

        console.log(contentType);

        if (!contentType || !contentType.includes("application/json")) {
          console.warn("JSON이 아닌 응답을 받음 (dev 환경)");
          return;
        }

        const data = await res.json();
        const latest = data.version;
        const current = localStorage.getItem("app-version");

        if (current && current !== latest) {
          localStorage.setItem("app-version", latest);
          window.location.reload();
        } else {
          localStorage.setItem("app-version", latest);
        }
      } catch (err) {
        console.error("버전체크실패: ", err);
      } finally {
        setLoading(false);
      }
    };

    checkVersion();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <h1>로딩중...</h1>
      </div>
    );
  }

  return null;
}
