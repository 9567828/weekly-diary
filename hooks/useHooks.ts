"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useScrollY = (state: Dispatch<SetStateAction<boolean>>) => {
  let initialScrollY = 0;

  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isFocus) {
        if (!initialScrollY) {
          initialScrollY = currentScrollY;
        }

        if (currentScrollY > initialScrollY) {
          window.scrollTo(0, initialScrollY);
        }
      } else {
        initialScrollY = 0;
      }
    };

    window.visualViewport?.addEventListener("resize", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFocus]);
};
