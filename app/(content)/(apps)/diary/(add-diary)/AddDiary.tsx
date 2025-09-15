"use client";

import style from "./addDiary.module.scss";
import ConfirmActionBtn from "@/components/ui/confirmActionBtn/ConfirmActionBtn";
import InputBox from "@/components/ui/InputBox";
import { ChangeEvent, FormEvent, useState } from "react";
import ConfirmModal from "@/components/ui/confrimModal/ConfirmModal";
import { useAppDispatch } from "@/lib/hooks";
import { addDiaryThunk } from "@/lib/diary/diary.thunk";

export default function AddDiary({ date }: { date: string }) {
  const [textMode, setTextMode] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();

  const modalClose = () => {
    setModalOn(false);
    setTextMode(false);
    setText("");
    setTitleValue("");
  };

  const handleCloseMode = () => {
    if (text.trim() === "" && titleValue.trim() === "") {
      setTextMode(false);
    } else {
      setTextMode(true);
      setModalOn(true);
    }
  };

  const onSubmint = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleValue.trim() === "" && text.trim() === "") {
      return;
    }

    const paylaod = {
      title: titleValue,
      text,
      diaryDate: date,
    };

    dispatch(addDiaryThunk(paylaod));

    setTitleValue("");
    setText("");
    setTextMode(false);
  };

  return (
    <>
      {!textMode ? (
        <button className={style.flex} onClick={() => setTextMode((prev) => !prev)}>
          <img src="/imgs/icons/ic_plus.svg" alt="추가" />
          <h1>새로운 일기 추가</h1>
        </button>
      ) : (
        <form action="" onSubmit={onSubmint}>
          <ConfirmActionBtn onCancelClick={handleCloseMode} />
          <div className={style["text-container"]}>
            <InputBox
              id="diaryTitle"
              variant="input-underline"
              onChange={(e) => setTitleValue(e.target.value)}
              value={titleValue}
              placeholder="제목을 입력하세요"
              maxLength={30}
            />
            <div className={style["text-wrap"]}>
              <div className={style["txt-padding"]}>
                <textarea
                  className={style.textarea}
                  name="diaryContent"
                  id="diaryContent"
                  placeholder="내용을 입력하세요"
                  maxLength={300}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className={style["text-length"]}>{text.length}/300</div>
            </div>
          </div>
        </form>
      )}
      {modalOn ? <ConfirmModal onCancel={() => setModalOn((prev) => !prev)} onConfirm={modalClose} /> : null}
    </>
  );
}
