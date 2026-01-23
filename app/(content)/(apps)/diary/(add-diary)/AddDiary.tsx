"use client";

import style from "./addDiary.module.scss";
import ConfirmActionBtn from "@/components/ui/confirmActionBtn/ConfirmActionBtn";
import InputBox from "@/components/ui/InputBox";
import { FormEvent, useState } from "react";
import ConfirmModal from "@/components/ui/confrimModal/ConfirmModal";
import { useAddDiaryMutation } from "@/hooks/useMutation/useDiaryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { diaryQueryKey } from "@/hooks/useQuerys/useDiaryQuery";
import { useAppDispatch } from "@/lib/hooks";
import { handleDiary } from "@/lib/slices/tabbarSlice";

export default function AddDiary({ date, weekNum }: { date: string; weekNum: number }) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { mutate } = useAddDiaryMutation();
  const [textMode, setTextMode] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [text, setText] = useState("");

  const modalClose = () => {
    setModalOn(false);
    setTextMode(false);
    setText("");
    setTitleValue("");
  };

  const handleCloseMode = () => {
    if (text.trim() === "" && titleValue.trim() === "") {
      setTextMode(false);
      dispatch(handleDiary(null));
    } else {
      setTextMode(true);
      setModalOn(true);
    }
  };

  const onSubmint = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === "") {
      setConfirmModal(true);
      return;
    }

    const paylaod = {
      title: titleValue === "" ? "제목없음" : titleValue,
      text: text,
      diary_date: date,
      week_num: weekNum,
    };

    mutate(paylaod, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({
          queryKey: diaryQueryKey,
        });

        dispatch(handleDiary(null));
        setTitleValue("");
        setText("");
        setTextMode(false);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <>
      {!textMode ? (
        <button
          className={style.flex}
          onClick={() => {
            setTextMode((prev) => !prev);
          }}
        >
          <img src="/imgs/icons/ic_plus.svg" alt="추가" />
          <h1>새로운 일기 추가</h1>
        </button>
      ) : (
        <form onSubmit={onSubmint}>
          <ConfirmActionBtn onCancelClick={handleCloseMode} />
          <div className={style["text-container"]} onClick={() => dispatch(handleDiary("add"))}>
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
                  value={text}
                  maxLength={300}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className={style["text-length"]}>{text.length}/300</div>
            </div>
          </div>
        </form>
      )}
      {modalOn ? (
        <ConfirmModal
          message="변경사항 폐기"
          confirmOnly={false}
          onCancel={() => setModalOn((prev) => !prev)}
          onConfirm={modalClose}
        />
      ) : null}
      {confirmModal ? <ConfirmModal confirmOnly={true} message="공란" onConfirm={() => setConfirmModal(false)} /> : null}
    </>
  );
}
