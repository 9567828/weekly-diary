import style from "../diary.module.scss";
import Button from "@/components/ui/Button";
import EditDiary from "../(edit)/EditDiary";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { useDeleteDiaryMutation } from "@/hooks/useMutation/useDiaryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { diaryQueryKey } from "@/hooks/useQuerys/useDiaryQuery";

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

  const hadndleOnSetting = () => {
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
        queryClient.invalidateQueries({
          queryKey: diaryQueryKey,
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <>
      {editMode ? (
        <EditDiary id={id} title={title} text={text} closeEdit={() => setEditMode((prev) => !prev)} />
      ) : (
        <>
          <div className={style["content-head"]}>
            <p className={style.title}>{title ? title : "제목없음"}</p>
            <div className={style["btn-wrap"]}>
              {onSetting ? (
                <div className={style["btn-wrap"]}>
                  <Button
                    existImg={true}
                    src="/imgs/icons/ic_delete.svg"
                    alt="삭제"
                    className="btn-18"
                    onClick={() => handleDelete(id)}
                  />
                  <Button
                    existImg={true}
                    src="/imgs/icons/ic_edit-note.svg"
                    alt="수정"
                    className="btn-18"
                    onClick={handleOnEditMode}
                  />
                </div>
              ) : null}
              <Button
                existImg={true}
                src="/imgs/icons/ic_menu.svg"
                alt="일기설정"
                className="btn-24"
                onClick={hadndleOnSetting}
              />
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
