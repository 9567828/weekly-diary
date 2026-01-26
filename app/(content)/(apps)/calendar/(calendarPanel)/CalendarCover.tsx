"use client";

import style from "./calendar.module.scss";
import { useIsMobile } from "@/hooks/useHooks";

export default function CalendarCover() {
  const isMobile = useIsMobile();

  const isfiledCover = true;

  return (
    <>
      {isfiledCover ? (
        <div className={`${style.img} ${isMobile ? style["img-mobile"] : ""}`.trim()}>
          <img src="/imgs/9a0695874aa43634410880271871cf2a.jpg" alt="사진" />
        </div>
      ) : (
        <div className={style.default}>
          <button className={style["cover-btn"]}>
            <div className={style.icon}>
              <img src="/imgs/icons/ic_album.svg" alt="기본이미지" />
            </div>
            <span className={style["cover-text"]}>커버 추가</span>
          </button>
        </div>
      )}
    </>
  );
}
