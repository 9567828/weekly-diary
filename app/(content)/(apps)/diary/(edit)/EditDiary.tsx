"use client";

import style from "../(add-diary)/addDiary.module.scss";
import ConfirmActionBtn from "@/components/ui/confirmActionBtn/ConfirmActionBtn";
import InputBox from "@/components/ui/InputBox";
import { ChangeEvent, FormEvent, useState } from "react";
import ConfirmModal from "@/components/ui/confrimModal/ConfirmModal";
import { useAppDispatch } from "@/lib/hooks";
import { editDiaryThunk } from "@/lib/diary/diary.thunk";

interface IEditDiary {
  id: string;
  closeEdit: () => void;
  title: string;
  text: string;
}

export default function EditDiary({ id, closeEdit, title, text }: IEditDiary) {
  const [modalOn, setModalOn] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [textValue, setTextValue] = useState(text);
  const [hasChanged, setHasChanged] = useState({ title: false, text: false });

  const dispatch = useAppDispatch();

  const modalClose = () => {
    setModalOn(false);
    setTextValue("");
    setTitleValue("");
    closeEdit();
  };

  const handleCloseEdit = () => {
    const anyChanged = Object.values(hasChanged).some((val) => val === true);
    if (anyChanged) {
      setModalOn(true);
    } else {
      closeEdit();
    }

    if (text.trim() === "" && titleValue.trim() === "") {
      closeEdit();
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
    setHasChanged((prev) => ({
      ...prev,
      title: title !== titleValue,
    }));
  };

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    setHasChanged((prev) => ({
      ...prev,
      text: text !== textValue,
    }));
  };

  const onSubmint = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const paylaod = {
      id,
      title: titleValue === "" ? "제목없음" : titleValue,
      text: textValue === "" ? "내용없음" : textValue,
    };

    dispatch(editDiaryThunk(paylaod));

    setTitleValue("");
    setTextValue("");
    closeEdit();
  };

  return (
    <>
      <form action="" onSubmit={onSubmint}>
        <ConfirmActionBtn onCancelClick={handleCloseEdit} />
        <div className={style["text-container"]}>
          <InputBox id="diaryTitle" variant="input-underline" onChange={onChangeTitle} value={titleValue} maxLength={30} />
          <div className={style["text-wrap"]}>
            <div className={style["txt-padding"]}>
              <textarea
                className={style.textarea}
                name="diaryContent"
                id="diaryContent"
                maxLength={300}
                value={textValue}
                onChange={onChangeText}
              />
            </div>
            <div className={style["text-length"]}>{textValue.length}/300</div>
          </div>
        </div>
      </form>

      {modalOn ? (
        <ConfirmModal message="변경사항 폐기" confirmOnly={false} onCancel={() => setModalOn(false)} onConfirm={modalClose} />
      ) : null}
    </>
  );
}
