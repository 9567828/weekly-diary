import style from "../diary.module.scss";
import Button from "@/components/ui/Button";
import EditDiary from "../(edit)/EditDiary";
import { useRef, useState } from "react";
import { useDeleteDiaryMutation } from "@/hooks/useMutation/useDiaryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/lib/hooks";
import { handleDiary } from "@/lib/slices/tabbarSlice";
import { handleDiaryInvalidateQueries } from "@/utils/handlers";
import { useClearBodyScroll, useOnClickOutSide } from "@/hooks/useHooks";
import EditModal from "@/components/ui/edit-modal/EditModal";

interface IDiary {
  id: string;
  title: string;
  text: string;
}

export default function DiaryContent({ id, title, text }: IDiary) {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteDiaryMutation();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [onSetting, setOnSetting] = useState(false);

  const delRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLButtonElement>(null);

  useOnClickOutSide(delRef, () => setOnSetting(false), setRef);
  useClearBodyScroll(onSetting);

  const handleOnSetting = () => {
    setOnSetting((prev) => !prev);
    if (editMode) {
      setOnSetting(false);
    }
  };

  const handleOnEditMode = () => {
    setEditMode((prev) => !prev);
    setOnSetting(false);
  };

  const handleDelete = (id: string) => {
    mutate(id, {
      onSuccess: (data) => {
        console.log(data);
        handleDiaryInvalidateQueries(queryClient);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <>
      {editMode ? (
        <EditDiary
          id={id}
          title={title}
          text={text}
          closeEdit={() => {
            setEditMode((prev) => !prev);
            dispatch(handleDiary(null));
          }}
        />
      ) : (
        <>
          <div className={style["content-head"]}>
            <p className={style.title}>{title ? title : "제목없음"}</p>
            <div className={style["btn-wrap"]}>
              {onSetting && <EditModal mode="diary" onDelete={() => handleDelete(id)} ref={delRef} />}
              <Button type="button" existImg={true} src="/imgs/icons/ic_edit-note.svg" alt="수정" className="btn-18" onClick={handleOnEditMode} />
              <Button type="button" btnRef={setRef} existImg={true} src="/imgs/icons/ic_menu.svg" alt="일기설정" className="btn-24" onClick={handleOnSetting} />
            </div>
          </div>
          <div className={style["content-diary"]}>
            <p className={style.text}>{text}</p>
          </div>
        </>
      )}
    </>
  );
}
