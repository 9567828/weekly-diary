"use client";

import { ChangeEvent, useRef, useState } from "react";
import style from "./calendar.module.scss";
import { useIsMobile, useOnClickOutSide } from "@/hooks/useHooks";
import { useDeleteCoverMutation, useUpsertCoverMutation } from "@/hooks/useMutation/useCoverMutation";
import { useSelectCover } from "@/hooks/useQuerys/useCoverQuery";
import { handleCoverInvalidateQueries } from "@/utils/handlers";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading";
import { createClient } from "@/utils/supabase/service/client";
import imageCompression from "browser-image-compression";

export default function CalendarCover({ year, month }: { year: number; month: number }) {
  const supabase = createClient();
  const isMobile = useIsMobile();
  const newMonth = month + 1;
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [prevCover, setPrevCover] = useState("");

  const { data, isError, error, isFetching } = useSelectCover(year, newMonth, supabase);
  const { mutate: upSertCover, isPending: addIsPendig } = useUpsertCoverMutation();
  const { mutate: deleteCover } = useDeleteCoverMutation();
  const btnRef = useRef<HTMLButtonElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  useOnClickOutSide(editRef, () => setEditMode(false), btnRef);

  if (isError) {
    console.log(error);
  }

  if (isFetching || addIsPendig) {
    return (
      <div className={style.empty}>
        <Loading />
      </div>
    );
  }

  const imgUrl = data?.url;
  const coverData = data?.data;
  const imgSrc = prevCover || imgUrl;
  const hasCover = Boolean(imgSrc);

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const file = files?.[0];
    if (!file) return;

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 720,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);

      // const previewUrl = URL.createObjectURL(compressedFile);
      // setPrevCover(previewUrl);
      setEditMode(false);

      upSertCover(
        { year, month: newMonth, file: compressedFile },
        {
          onSuccess: (data) => {
            console.log(data);
            handleCoverInvalidateQueries(queryClient);
            // URL.revokeObjectURL(previewUrl);
            setPrevCover("");
            e.target.value = "";
          },
          onError: (error) => {
            console.error(error);
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCover = () => {
    deleteCover(
      { year, month: newMonth, path: coverData.base_path },
      {
        onSuccess: (data) => {
          console.log(data);
          handleCoverInvalidateQueries(queryClient);
          setEditMode(false);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <>
      {!hasCover ? (
        <div className={style.default}>
          <input type="file" id="inputFile" onChange={onChangeFile} disabled={addIsPendig} accept="image/*" />
          <label htmlFor="inputFile" className={style["cover-btn"]}>
            <div className={style.icon}>
              <img src="/imgs/icons/ic_album.svg" alt="기본이미지" />
            </div>
            <span className={style["cover-text"]}>커버 추가</span>
          </label>
        </div>
      ) : (
        <div className={`${style.img} ${isMobile ? style["img-mobile"] : ""}`.trim()}>
          {imgSrc && <img src={imgSrc} alt="사진" />}
          <div className={style["edit-img"]}>
            <button ref={btnRef} type="button" className={style["action-btn"]} onClick={() => setEditMode((prev) => !prev)} disabled={addIsPendig}>
              <img src="/imgs/icons/ic_menu.svg" alt="메뉴" loading="eager" fetchPriority="high" />
            </button>
            {editMode && (
              <div ref={editRef} className={style["edit-btn-wrap"]}>
                <label htmlFor="inputFileEdit" className={`${style["btn-init"]}`}>
                  <img src="/imgs/icons/ic_edit-note.svg" alt="사진수정" />
                  <span>수정</span>
                  <input type="file" id="inputFileEdit" onChange={onChangeFile} accept="image/*" />
                </label>
                <button type="button" className={`${style["btn-init"]}`} onClick={handleDeleteCover}>
                  <img src="/imgs/icons/ic_delete.svg" alt="사진삭제" />
                  <span>삭제</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
