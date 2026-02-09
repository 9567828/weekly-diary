import { RefObject, ChangeEvent } from "react";
import style from "./edit.module.scss";
import ModalLayout from "@/components/ui/edit-modal/ModalLayout";

interface IProps {
  mode: "calendar" | "diary";
  onDelete: () => void;
  onImgChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  ref: RefObject<HTMLDivElement | null>;
}

export default function EditModal({ mode, ref, onDelete, onImgChange }: IProps) {
  return (
    <ModalLayout mode="normal">
      <div ref={ref} className={style["edit-modal"]}>
        {mode === "calendar" && (
          <label htmlFor="inputFileEdit" className={`${style["action-btn"]} ${style["edit-btn"]}`}>
            <img src="/imgs/icons/ic_edit-note.svg" alt="사진수정" />
            <span>{mode === "calendar" ? "새 이미지로 변경" : "수정 하기"}</span>
            <input type="file" id="inputFileEdit" onChange={onImgChange} accept="image/*" />
          </label>
        )}
        <button type="button" onClick={onDelete} className={`${style["action-btn"]} ${style["del-btn"]}`}>
          <img src="/imgs/icons/ic_delete.svg" alt="삭제" />
          <span>삭제 하기</span>
        </button>
      </div>
    </ModalLayout>
  );
}
