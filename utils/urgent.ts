// export const getIsMobile = () => {
//   if (typeof window === "undefined") {
//     return { userAgent: "", isMobile: false }; // SSR 시 안전하게 반환
//   }

//   const userAgent = window.navigator.userAgent;
//   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

//   return { userAgent, isMobile };
// };

import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const check = /Mobi|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    setIsMobile(check);
  }, []);

  return isMobile;
}
