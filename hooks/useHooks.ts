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

export const useOnClickOutSide = (innerRef: React.RefObject<HTMLElement | null>, handler: () => void, btn?: React.RefObject<HTMLElement | null>, isGlobModalOpen?: boolean) => {
  useEffect(() => {
    if (isGlobModalOpen) return;

    const listener = (e: MouseEvent) => {
      const target = e.target as Node;

      // 모달 내부 클릭
      if (innerRef.current?.contains(target)) return;

      // 모달 오픈 버튼 클릭
      if (btn?.current?.contains(target)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [innerRef, handler]);
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
