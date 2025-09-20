"use client";

import { checkVersion } from "@/lib/checkVersion";
import { useEffect } from "react";

export default function VersionChecker() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const updated = await checkVersion();
      if (updated) {
        window.location.reload();
      }
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(interval);
  }, []);

  return null;
}
