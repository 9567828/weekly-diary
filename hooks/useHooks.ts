"use client";

import { RefObject, useEffect, useLayoutEffect, useState } from "react";

const ITEM_HEIGHT = 40;
const DUMMY_COUNT_TOP = 1; // 00

export const useOnScroll = (ref: RefObject<HTMLDivElement | null>, itemArr: any[]) => {
  const el = ref.current!;

  const index = Math.round((el.scrollTop + el.clientHeight / 2) / ITEM_HEIGHT);
  const valueIndex = index - DUMMY_COUNT_TOP;

  const value = itemArr[valueIndex];

  return value;
};

export const useSetInitialTime = (itemArr: any[], initial: string, ref: RefObject<HTMLDivElement | null>) => {
  const ITEM_HEIGHT = 40;
  const valueIndex = itemArr.indexOf(initial);
  const renderIndex = valueIndex;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const centerOffset = renderIndex * ITEM_HEIGHT - (el.clientHeight - ITEM_HEIGHT) / 2;

    el.scrollTop = centerOffset;

    // el.scrollTop = renderIndex * ITEM_HEIGHT - el.clientHeight / 2 + ITEM_HEIGHT / 2;
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
