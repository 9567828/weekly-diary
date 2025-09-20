"use client";

import { useEffect, useState } from "react";
import Todos from "./(rendering-todo)/Todos";
import { checkVersion } from "@/lib/checkVersion";
import Logo from "@/components/ui/logo/Logo";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const isCheck = await checkVersion();
      setLoading(isCheck ?? false);
    };
    run();
  }, []);
  return (
    <>
      {loading ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Logo />
        </div>
      ) : (
        <Todos />
      )}
    </>
  );
}
