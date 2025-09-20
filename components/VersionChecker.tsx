"use client";

import { checkVersion } from "@/lib/checkVersion";
import { useEffect } from "react";

export default function VersionChecker() {
  useEffect(() => {
    (async () => {
      const updated = await checkVersion();
      if (updated) {
        window.location.reload();
      }
    })();
  }, []);

  return null;
}
