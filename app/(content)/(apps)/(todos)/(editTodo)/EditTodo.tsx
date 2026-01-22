import { ChangeEvent, Dispatch, FormEvent, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import style from "./edittodo.module.scss";
import Button from "@/components/ui/Button";
import InputBox from "@/components/ui/InputBox";
import ToggleBtn from "@/components/ui/toggleBtn/ToggleBtn";
import TimePicker from "../(time)/TimePicker";
import ConfirmModal from "@/components/ui/confrimModal/ConfirmModal";
import ConfirmActionBtn from "@/components/ui/confirmActionBtn/ConfirmActionBtn";
import { AmPmType, EditTodoType } from "@/utils/supabase";
import { useDeleteTodoMutation, useEditTodoMutation } from "@/hooks/useMutation/useTodoMutation";
import { useQueryClient } from "@tanstack/react-query";
import { todoDateKey } from "@/hooks/useQuerys/useTodoQuery";
import { useAppDispatch } from "@/lib/hooks";
import { handleTodo } from "@/lib/slices/tabbarSlice";
import { createPortal } from "react-dom";
import CustomTimer from "./CustomTimer";
import { makeTimes } from "@/utils/handlers";
import { useOnScroll, useSetInitialTime } from "@/hooks/useHooks";
import { isMobile } from "react-device-detect";

type selectType = {
  src: string;
  title: "중요" | "시간" | "날짜" | "반복";
  toggleId: "important" | "time" | "date" | "repeat";
  picker: boolean;
};

interface IEditTodo {
  id: string;
  text: string;
  is_import: boolean;
  is_time: boolean;
  time?: string;
  is_ampm?: AmPmType;
  todo_date?: string;
}

interface IHandler {
  onClick: () => void;
}

type props = IEditTodo & IHandler;

const selectBox: selectType[] = [
  { src: "/imgs/icons/ic_important.svg", title: "중요", toggleId: "important", picker: false },
  { src: "/imgs/icons/ic_time.svg", title: "시간", toggleId: "time", picker: true },
  { src: "/imgs/icons/ic_calendar.svg", title: "날짜", toggleId: "date", picker: true },
  { src: "/imgs/icons/ic_repeat.svg", title: "반복", toggleId: "repeat", picker: true },
];

const ampmList = ["자정", "오전", "오후", "정오"];
const hours = makeTimes("hour");
const minutes = makeTimes("minute");

export default function EditTodo({ id, text, is_import, is_time, time, is_ampm, todo_date, onClick }: props) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { mutate: edit } = useEditTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  const [mount, setMount] = useState(false);
  const [value, setValue] = useState(text);
  const [dateValue, setDateValue] = useState(todo_date);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOn, setConfirmOn] = useState(false);
  const [toggleChecked, setToggleChecked] = useState({
    is_import,
    is_time,
  });
  const [ampm, setAmpm] = useState<AmPmType | null>(is_ampm ?? null);
  const getTime = () => {
    const h = time?.slice(0, 2);
    const m = time?.slice(3, 6);
    return { h, m };
  };

  const [hour, setHour] = useState<string>(getTime().h ?? "");
  const [min, setMin] = useState<string>(getTime().m ?? "");
  const [hasChanged, setHasChanged] = useState({
    text: false,
    time: false,
    is_time: false,
    is_import: false,
    date: false,
    is_ampm: false,
  });
  const anyChanged = Object.values(hasChanged).some((val) => val === true);

  const isValidDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setHasChanged((prev) => ({
      ...prev,
      text: text !== value,
    }));
  };

  const closeEdit = () => {
    if (anyChanged) {
      setModalOpen(true);
    } else {
      onClick();
    }
  };

  const onChangeToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const targetId = e.target.id;
    const checked = e.target.checked;

    if (targetId === "important") {
      setHasChanged((prev) => ({
        ...prev,
        is_import: is_import !== checked,
      }));

      setToggleChecked((prev) => ({
        ...prev,
        is_import: checked,
      }));
    }

    if (targetId === "time") {
      setHasChanged((prev) => ({
        ...prev,
        is_time: is_time !== checked,
      }));
      setToggleChecked((prev) => ({
        ...prev,
        is_time: checked,
      }));
    }
  };

  const ampmRef = useRef<HTMLDivElement | null>(null);
  const hourRef = useRef<HTMLDivElement | null>(null);
  const minRef = useRef<HTMLDivElement | null>(null);

  const onChangeHour = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.slice(0, 2);

    if (parseInt(value, 10) >= 13) {
      alert("시간형식은 12시간제 입니다.");
      value = "01";
    }

    setHour(value);
    setHasChanged((prev) => ({
      ...prev,
      time: time !== value,
    }));
  };

  const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.slice(0, 2);

    if (parseInt(value, 10) >= 60) {
      alert("60분 이상의 시간을 입력할 수 없습니다.");
      value = "00";
    }

    setMin(value);
    setHasChanged((prev) => ({
      ...prev,
      time: time !== value,
    }));
  };

  const onChangeTime = (
    ref: RefObject<HTMLDivElement | null>,
    listArr: string[],
    setState: Dispatch<SetStateAction<any>>,
    changed: "ampm" | "time",
  ) => {
    const v = useOnScroll(ref, listArr);
    setState(v);
    if (changed === "ampm") {
      setHasChanged((prev) => ({
        ...prev,
        is_ampm: is_ampm !== v,
      }));
    } else {
      setHasChanged((prev) => ({
        ...prev,
        time: time !== v,
      }));
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidTodoDate = isValidDate(dateValue!);

    if (!isValidTodoDate) {
      alert("날짜형식을 확인해 주세요 yyyy-mm-dd");
      return;
    }

    console.log(anyChanged);

    if (!anyChanged) {
      onClick();
      return;
    }

    if (value!.trim() === "") {
      setConfirmOn(true);
      return;
    }

    const makeTime = `${hour}:${min}`;

    const editObj: EditTodoType = {
      payload: {
        updated_at: new Date().toISOString(),
        text: value,
        todo_date: dateValue!,
        is_import: toggleChecked.is_import,
        is_time: toggleChecked.is_time,
        is_ampm: ampm || "오전",
        time: makeTime,
      },
      id,
    };

    edit(editObj, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: todoDateKey,
        });
        onClick();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return createPortal(
    <>
      <div className={style.bg}>
        <form className={style["edit-todo-wrap"]} onSubmit={onSubmit}>
          <ConfirmActionBtn onCancelClick={closeEdit} />
          <div className={style["edit-box"]}>
            <InputBox
              id="text"
              variant="input-underline"
              onChange={onChange}
              value={value!}
              onFocus={() => dispatch(handleTodo("edit"))}
              onBlur={() => dispatch(handleTodo(null))}
            />

            <div className={style["select-wrap"]}>
              {selectBox.map((s, i) => {
                return (
                  <div key={i}>
                    <div className={style["select-box"]}>
                      <div className={style.icon}>
                        <img src={s.src} alt={`${s.title}아이콘`} />
                      </div>
                      <div className={style["meta-wrap"]}>
                        <div className={style.text}>
                          <h5>{s.title}</h5>
                          {s.toggleId === "time" && <p>{`${ampm} ${time}`}</p>}
                        </div>

                        {s.toggleId === "date" ? (
                          <input
                            className={style["date-input"]}
                            type="date"
                            name="todo_date"
                            id="todo_date"
                            pattern="\d{4}-\d{2}-\d{2}"
                            min="2000-01-01"
                            max="2100-12-31"
                            value={dateValue}
                            onChange={(e) => {
                              const value = e.target.value;
                              setDateValue(value);
                              setHasChanged((prev) => ({
                                ...prev,
                                date: value !== "",
                              }));
                            }}
                          />
                        ) : (
                          <ToggleBtn
                            id={s.toggleId}
                            onChange={onChangeToggle}
                            checked={
                              s.toggleId === "important"
                                ? toggleChecked.is_import!
                                : s.toggleId === "time"
                                  ? toggleChecked.is_time!
                                  : false
                            }
                          />
                        )}
                      </div>
                    </div>
                    {s.toggleId === "time" && toggleChecked.is_time && (
                      <>
                        {!isMobile ? (
                          <TimePicker
                            checked={true}
                            isAmpm={ampm as AmPmType}
                            hourValue={hour}
                            minutesValue={min}
                            onChangeHour={onChangeHour}
                            onChangeMin={onChangeMin}
                            onSelectChange={(e) => {
                              const selValue = e.target.value as AmPmType;
                              setAmpm(selValue);
                              setHasChanged((prev) => ({
                                ...prev,
                                is_ampm: is_ampm !== selValue,
                              }));
                            }}
                          />
                        ) : (
                          <CustomTimer
                            timer={[
                              {
                                variant: "ampm",
                                list: ampmList,
                                time: ampm!,
                                timeRef: ampmRef,
                                onScroll: () => {
                                  onChangeTime(ampmRef, ampmList, setAmpm, "ampm");
                                },
                              },
                              {
                                variant: "hour",
                                list: hours,
                                time: hour,
                                timeRef: hourRef,
                                onScroll: () => {
                                  onChangeTime(hourRef, hours, setHour, "time");
                                },
                              },
                              {
                                variant: "min",
                                list: minutes,
                                time: min,
                                timeRef: minRef,
                                onScroll: () => {
                                  onChangeTime(minRef, minutes, setMin, "time");
                                },
                              },
                            ]}
                          />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            type="button"
            label="할일 삭제하기"
            variant="txt-btn"
            className="delete-txt-btn"
            onClick={() => deleteTodo(id)}
          />
        </form>
      </div>
      {confirmOn ? <ConfirmModal confirmOnly={true} message="공란 입니다" onConfirm={() => setConfirmOn(false)} /> : null}
      {modalOpen ? (
        <ConfirmModal
          confirmOnly={false}
          message="변경사항 폐기"
          onCancel={() => {
            setModalOpen((prev) => !prev);
          }}
          onConfirm={onClick}
        />
      ) : null}
    </>,
    document.body,
  );
}
