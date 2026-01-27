"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "./calendar.module.scss";
import { useIsMobile } from "@/hooks/useHooks";
import { saveCoverImg } from "@/utils/supabase/sql/cover";
import { useAddCoverMutation } from "@/hooks/useMutation/useCoverMutation";
import { useSelectCover } from "@/hooks/useQuerys/useCoverQuery";
import { handleCoverInvalidateQueries } from "@/utils/handlers";
import { useQueryClient } from "@tanstack/react-query";

export default function CalendarCover({ year, month }: { year: number; month: number }) {
  const isMobile = useIsMobile();
  const newMonth = month + 1;
  const queryClient = useQueryClient();
  const { data, isError, error, isLoading } = useSelectCover(year, newMonth);
  const { mutate } = useAddCoverMutation();

  if (isLoading) {
    return null;
  }

  const imgUrl = data?.url;
  const coverDate = data?.data;

  if (isError) {
    console.log(error);
  }

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const file = files?.[0];
    if (!file) return;

    mutate(
      { year, month: newMonth, file },
      {
        onSuccess: (data) => {
          console.log(data);
          handleCoverInvalidateQueries(queryClient);
          e.target.value = "";
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <>
      {data !== null && (coverDate?.year === year || coverDate?.month === month) ? (
        <div className={`${style.img} ${isMobile ? style["img-mobile"] : ""}`.trim()}>
          <img src={imgUrl} alt="사진" />
        </div>
      ) : (
        <div className={style.default}>
          <input type="file" id="inputFile" onChange={onChangeFile} />
          <label htmlFor="inputFile" className={style["cover-btn"]}>
            <div className={style.icon}>
              <img src="/imgs/icons/ic_album.svg" alt="기본이미지" />
            </div>
            <span className={style["cover-text"]}>커버 추가</span>
          </label>
        </div>
      )}
    </>
  );
}
