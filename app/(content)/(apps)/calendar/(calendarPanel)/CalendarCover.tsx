"use client";

import { ChangeEvent, useRef, useState } from "react";
import style from "./calendar.module.scss";
import { useOnClickOutSide, useClearBodyScroll } from "@/hooks/useHooks";
import { useDeleteCoverMutation } from "@/hooks/useMutation/useCoverMutation";
import { useSelectCover } from "@/hooks/useQuerys/useCoverQuery";
import { handleCoverInvalidateQueries } from "@/utils/handlers";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading";
import { createClient } from "@/utils/supabase/service/client";
import imageCompression from "browser-image-compression";
import EditModal from "@/components/ui/edit-modal/EditModal";
import ImgCropper from "./ImgCropper";

export default function CalendarCover({ year, month }: { year: number; month: number }) {
  const supabase = createClient();
  const newMonth = month + 1;
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [prev, setPrev] = useState("");

  const { data, isError, error, isFetching } = useSelectCover(year, newMonth, supabase);
  const { mutate: deleteCover } = useDeleteCoverMutation();
  const btnRef = useRef<HTMLButtonElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  useOnClickOutSide(editRef, () => setEditMode(false), btnRef);
  useClearBodyScroll(editMode);

  if (isError) {
    console.log(error);
  }

  if (isFetching) {
    return (
      <div className={style.empty}>
        <Loading />
      </div>
    );
  }

  const baseURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resize_cover/`;
  const imgURL = `${baseURL}${data?.path}`;
  const hasCover = Boolean(data !== undefined && data !== null);

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const reader = new FileReader();

    const file = files?.[0];
    if (!file) return;

    setEditMode(false);

    const options = {
      initialQuality: 1,
      maxSizeMB: 3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        setPrev(reader.result as string);
      };
      e.target.value = "";
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCover = () => {
    deleteCover(
      { path: data?.base_path! },
      {
        onSuccess: (data) => {
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
        <button ref={btnRef} type="button" className={style["action-btn"]} onClick={() => setEditMode((prev) => !prev)}>
          <img src="/imgs/icons/ic_menu.svg" alt="메뉴" loading="eager" fetchPriority="high" />
        </button>
      )}
      {!hasCover ? (
        <div className={style.default}>
          <input type="file" id="inputFile" onChange={onChangeFile} accept="image/*" />
          <label htmlFor="inputFile" className={style["cover-btn"]}>
            <div className={style.icon}>
              <img src="/imgs/icons/ic_album.svg" alt="기본이미지" />
            </div>
            <span className={style["cover-text"]}>커버 추가</span>
          </label>
        </div>
      ) : (
        <div className={style.img}>{imgURL && <img src={imgURL} alt="사진" />}</div>
      )}
      {editMode && <EditModal mode="calendar" ref={editRef} onImgChange={onChangeFile} onDelete={handleDeleteCover} />}
      {prev && (
        <ImgCropper
          img={prev}
          year={year}
          month={newMonth}
          onClose={() => setPrev("")}
          onSuccess={() => {
            setPrev("");
          }}
        />
      )}
    </div>
  );
}
