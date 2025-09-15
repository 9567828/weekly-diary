import style from "../diary.module.scss";
import Button from "@/components/ui/Button";
import EditDiary from "../(edit)/EditDiary";
import { useState } from "react";

interface IDiary {
  id: string;
  title: string;
  text: string;
}

export default function DiaryContent({ id, title, text }: IDiary) {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      {editMode ? (
        <EditDiary id={id} title={title} text={text} closeEdit={() => setEditMode((prev) => !prev)} />
      ) : (
        <>
          <div className={style["content-head"]}>
            <p className={style.title}>{title ? title : "제목없음"}</p>
            <Button
              existImg={true}
              src="/imgs/icons/ic_edit-24.svg"
              alt="수정"
              className="btn-24"
              onClick={() => setEditMode((prev) => !prev)}
            />
          </div>
          <div className={style["content-diary"]}>
            <p className={style.text}>{text}</p>
          </div>
        </>
      )}
    </>
  );
}
