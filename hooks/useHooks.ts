"use client";

import { RefObject, useEffect, useLayoutEffect, useState } from "react";
import { ITEM_HEIGHT } from "@/utils/handlers";

export const useSetInitialTime = (itemArr: any[], initial: string, ref: RefObject<HTMLDivElement | null>) => {
  const renderIndex = itemArr.indexOf(initial);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.scrollTop = renderIndex * ITEM_HEIGHT - (el.clientHeight - ITEM_HEIGHT) / 2;
  }, [initial, itemArr]);
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(mobile || ("ontouchstart" in window && window.innerWidth <= 1024));
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  return isMobile;
};

export const useOnClickOutSide = (ref: React.RefObject<HTMLElement | null>, handler: () => void, btn?: React.RefObject<HTMLElement | null>, isGlobModalOpen?: boolean) => {
  useEffect(() => {
    if (isGlobModalOpen) return;

    if (btn?.current) return;

    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

export const useClearBodyScroll = (modal: any) => {
  useEffect(() => {
    if (modal) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.removeAttribute("style");
    }
  }, [modal]);
};
