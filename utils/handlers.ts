import { isChrome, isMobile, isMobileSafari, isSafari, MobileView } from "react-device-detect";

type timetype = "hour" | "minute";

export const makeTimes = (time: timetype) => {
  let t: string[] = [];
  const num = time === "hour" ? 13 : 60;

  for (let i = 0; i <= num; ++i) {
    const h = String(i).padStart(2, "0");
    t.push(h);
  }

  if (time === "minute") {
    t.unshift("99");
  }

  return t;
};

export const isMobileDevice = isMobileSafari || isMobile;
