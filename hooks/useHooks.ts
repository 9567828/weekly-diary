"use client";

import { useEffect, useState } from "react";

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

export const useIsAndroid = () => {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const checkAndroid = () => {
      const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = /Android/i.test(userAgent);
      setIsAndroid(mobile);
    };
    checkAndroid();

    window.addEventListener("resize", checkAndroid);
    return () => window.removeEventListener("resize", checkAndroid);
  }, []);

  return isAndroid;
};

export const useIsIPhone = () => {
  const [isIPhone, setIsIPhone] = useState(false);

  useEffect(() => {
    const checkIPhone = () => {
      const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = /iPhone|iPad|iPod/i.test(userAgent) || (userAgent.includes("Macintosh") && "ontouchend" in document);
      setIsIPhone(mobile);
    };
    checkIPhone();

    window.addEventListener("resize", checkIPhone);
    return () => window.removeEventListener("resize", checkIPhone);
  }, []);

  return isIPhone;
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

export const useClearBodyScroll = (modal: boolean) => {
  const isIPhone = useIsIPhone();

  useEffect(() => {
    const preventTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (!modal) {
      // 공통 cleanup
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      if (isIPhone) {
        window.scrollTo(0, scrollY);
      }
      return;
    }

    // modal === true
    if (!isIPhone) {
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      document.addEventListener("touchmove", preventTouchMove, {
        passive: false,
      });

      return () => {
        document.removeEventListener("touchmove", preventTouchMove);
      };
    }
  }, [modal, isIPhone]);
};
