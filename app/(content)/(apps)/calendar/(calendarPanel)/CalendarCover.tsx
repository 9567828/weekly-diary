"use client";

import { ChangeEvent, useRef, useState } from "react";
import style from "./calendar.module.scss";
import { useIsMobile, useOnClickOutSide, useClearBodyScroll } from "@/hooks/useHooks";
import { useDeleteCoverMutation, useUpsertCoverMutation } from "@/hooks/useMutation/useCoverMutation";
import { useSelectCover } from "@/hooks/useQuerys/useCoverQuery";
import { handleCoverInvalidateQueries } from "@/utils/handlers";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading";
import { createClient } from "@/utils/supabase/service/client";
import imageCompression from "browser-image-compression";
import EditModal from "@/components/ui/edit-modal/EditModal";

export default function CalendarCover({ year, month }: { year: number; month: number }) {
  const supabase = createClient();
  const isMobile = useIsMobile();
  const newMonth = month + 1;
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [prevCover, setPrevCover] = useState("");

  const { data, isError, error, isFetching } = useSelectCover(year, newMonth, supabase);
  const { mutate: upSertCover, isPending: addIsPending } = useUpsertCoverMutation();
  const { mutate: deleteCover } = useDeleteCoverMutation();
  const btnRef = useRef<HTMLButtonElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  useOnClickOutSide(editRef, () => setEditMode(false), btnRef);

  if (isError) {
    console.log(error);
  }

  if (isFetching || addIsPending) {
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
    <div className={style["cover-wrap"]}>
      {hasCover && (
        <button ref={btnRef} type="button" className={style["action-btn"]} onClick={() => setEditMode((prev) => !prev)} disabled={addIsPending}>
          <img src="/imgs/icons/ic_menu.svg" alt="메뉴" loading="eager" fetchPriority="high" />
        </button>
      )}
      {!hasCover ? (
        <div className={style.default}>
          <input type="file" id="inputFile" onChange={onChangeFile} disabled={addIsPending} accept="image/*" />
          <label htmlFor="inputFile" className={style["cover-btn"]}>
            <div className={style.icon}>
              <img src="/imgs/icons/ic_album.svg" alt="기본이미지" />
            </div>
            <span className={style["cover-text"]}>커버 추가</span>
          </label>
        </div>
      ) : (
        <div className={`${style.img} ${isMobile ? style["img-mobile"] : ""}`.trim()}>{imgSrc && <img src={imgSrc} alt="사진" />}</div>
      )}
      {editMode && <EditModal mode="calendar" ref={editRef} onImgChange={onChangeFile} onDelete={handleDeleteCover} />}
    </div>
  );
}
