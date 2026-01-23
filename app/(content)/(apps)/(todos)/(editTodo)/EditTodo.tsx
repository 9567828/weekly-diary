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
import { useAppDispatch } from "@/lib/hooks";
import { handleTodo } from "@/lib/slices/tabbarSlice";
import { createPortal } from "react-dom";
import CustomTimer from "./CustomTimer";
import { getScrollIndex, handleOnScroll, handleTodoInvalidateQueries, makeTimes } from "@/utils/handlers";
import { isMobile } from "react-device-detect";

type toggleIdType = "is_import" | "is_time" | "is_date" | "is_repeat";
type toggleMap = Record<toggleIdType, boolean>;

type selectType = {
  src: string;
  title: "중요" | "시간" | "날짜" | "반복";
  toggleId: toggleIdType;
};

interface IEditTodo {
  id: string;
  text: string;
  is_import: boolean;
  is_time: boolean;
  is_repeat: boolean;
  time?: string;
  is_ampm?: AmPmType;
  todo_date?: string;
  onClick: () => void;
}

const selectBox: selectType[] = [
  { src: "/imgs/icons/ic_important.svg", title: "중요", toggleId: "is_import" },
  { src: "/imgs/icons/ic_time.svg", title: "시간", toggleId: "is_time" },
  { src: "/imgs/icons/ic_calendar.svg", title: "날짜", toggleId: "is_date" },
  { src: "/imgs/icons/ic_repeat.svg", title: "반복", toggleId: "is_repeat" },
];

const ampmList = ["오전", "오전", "오후", "오후"];
const hours = makeTimes("hour");
const minutes = makeTimes("minute");

export default function EditTodo({ ...props }: IEditTodo) {
  const { id, text, is_import, is_time, time, is_ampm, is_repeat, todo_date, onClick } = props;

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { mutate: edit } = useEditTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  const [mount, setMount] = useState(false);
  const [value, setValue] = useState(text);
  const [dateValue, setDateValue] = useState(todo_date);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOn, setConfirmOn] = useState(false);
  const [toggleChecked, setToggleChecked] = useState<toggleMap>({
    is_import,
    is_time,
    is_repeat,
    is_date: false,
  });
  const [ampm, setAmpm] = useState<AmPmType | null>(is_ampm ?? null);
  const getTime = () => {
    const h = time?.slice(0, 2);
    const m = time?.slice(3, 6);
    return { h, m };
  };

  type HasChangedKey = "text" | "is_import" | "is_time" | "is_ampm" | "hour" | "min" | "is_repeat" | "date";
  type HasChangedType = Record<HasChangedKey, boolean>;

  const [hour, setHour] = useState<string>(getTime().h ?? "");
  const [min, setMin] = useState<string>(getTime().m ?? "");
  const [hasChanged, setHasChanged] = useState<HasChangedType>({
    text: false,
    is_import: false,
    is_time: false,
    is_ampm: false,
    hour: false,
    min: false,
    is_repeat: false,
    date: false,
  });

  const handleHasChanged = (changedKey: HasChangedKey, compare: boolean) => {
    setHasChanged((prev) => ({
      ...prev,
      [changedKey]: compare,
    }));
  };

  const anyChanged = Object.values(hasChanged).some((val) => val);

  const ampmRef = useRef<HTMLDivElement | null>(null);
  const hourRef = useRef<HTMLDivElement | null>(null);
  const minRef = useRef<HTMLDivElement | null>(null);

  const isValidDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleHasChanged("text", text !== e.target.value);
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

    setToggleChecked((prev) => ({
      ...prev,
      [targetId]: checked,
    }));

    console.log(checked);

    const initialMap: Record<string, boolean> = {
      is_import,
      is_time,
      is_repeat,
    };

    const keyMap: Record<string, HasChangedKey> = {
      text: "text",
      is_import: "is_import",
      is_time: "is_time",
      is_ampm: "is_ampm",
      hour: "hour",
      min: "min",
      is_repeat: "is_repeat",
      date: "date",
    };

    const key = keyMap[targetId];

    if (!key) return;

    const init = initialMap[targetId];

    handleHasChanged(key, init !== checked);
  };

  const onChangeTimes = (value: string, type: "hour" | "min") => {
    let v = value.slice(0, 2);

    if (type === "hour") {
      if (parseInt(v, 10) >= 13) {
        alert("시간형식은 12시간제 입니다.");
        v = "01";
      }

      setHour(v);
      handleHasChanged("hour", getTime().h !== v);
    } else {
      if (parseInt(value, 10) >= 60) {
        alert("60분 이상의 시간을 입력할 수 없습니다.");
        v = "00";
      }

      setMin(v);
      handleHasChanged("min", getTime().m !== v);
    }
  };

  const onChangeScrollTime = (
    ref: RefObject<HTMLDivElement | null>,
    listArr: string[],
    setState: Dispatch<SetStateAction<any>>,
    changed: "is_ampm" | "hour" | "min",
  ) => {
    handleOnScroll(() => {
      const v = getScrollIndex(ref, listArr);
      setState(v);

      const compareValue = changed === "is_ampm" ? is_ampm : changed === "hour" ? getTime().h : getTime().m;

      handleHasChanged(changed, compareValue !== v);
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidTodoDate = isValidDate(dateValue!);

    if (!isValidTodoDate) {
      alert("날짜형식을 확인해 주세요 yyyy-mm-dd");
      return;
    }

    if (!anyChanged) {
      onClick();
      return;
    }

    if (value!.trim() === "") {
      setConfirmOn(true);
      return;
    }

    const makeTime = `${hour}:${min}`;

    const newAmpm = !toggleChecked.is_time && ampm !== null ? "오전" : ampm;
    const newTime = !toggleChecked.is_time ? "09:00" : makeTime;

    const editObj: EditTodoType = {
      payload: {
        updated_at: new Date().toISOString(),
        text: value,
        todo_date: dateValue!,
        is_import: toggleChecked.is_import,
        is_time: toggleChecked.is_time,
        is_ampm: newAmpm!,
        time: newTime,
        is_repeat: toggleChecked.is_repeat,
      },
      id,
    };

    edit(editObj, {
      onSuccess: (data) => {
        handleTodoInvalidateQueries(queryClient);
        onClick();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  useEffect(() => {
    if (!toggleChecked.is_time) {
      setHour(getTime().h ?? "");
      setMin(getTime().m ?? "");
      setAmpm(is_ampm ?? null);
    }
  }, [toggleChecked.is_time]);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return createPortal(
    <>
      <div className={style.bg}>
        <form onSubmit={onSubmit}>
          <div className={style["edit-todo-wrap"]}>
            <ConfirmActionBtn onCancelClick={closeEdit} />
            <div className={style.inner}>
              <div className={style.scroll}>
                <div className={style["edit-box"]}>
                  <InputBox
                    id="text"
                    variant="input-underline"
                    onChange={onTextChange}
                    value={value!}
                    onFocus={() => dispatch(handleTodo("edit"))}
                    onBlur={() => dispatch(handleTodo(null))}
                  />

                  <div className={style["select-wrap"]}>
                    {selectBox.map((s, i) => {
                      const checked = toggleChecked[s.toggleId] ?? false;

                      return (
                        <div key={i}>
                          <div className={style["select-box"]}>
                            <div className={style.icon}>
                              <img src={s.src} alt={`${s.title}아이콘`} />
                            </div>
                            <div className={style["meta-wrap"]}>
                              <div className={style.text}>
                                <h5>{s.title}</h5>
                                {s.toggleId === "is_time" && toggleChecked.is_time && <p>{`${ampm} ${hour}:${min}`}</p>}
                              </div>
                              <ToggleBtn id={s.toggleId} onChange={onChangeToggle} checked={checked} />
                            </div>
                          </div>
                          {s.toggleId === "is_date" && toggleChecked.is_date && (
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
                                handleHasChanged("date", value !== "");
                              }}
                            />
                          )}
                          {s.toggleId === "is_time" && toggleChecked.is_time && (
                            <>
                              {!isMobile ? (
                                <TimePicker
                                  checked={true}
                                  isAmpm={ampm as AmPmType}
                                  hourValue={hour}
                                  minutesValue={min}
                                  onChangeHour={(e) => onChangeTimes(e.target.value, "hour")}
                                  onChangeMin={(e) => onChangeTimes(e.target.value, "min")}
                                  onSelectChange={(e) => {
                                    const selValue = e.target.value as AmPmType;
                                    setAmpm(selValue);
                                    handleHasChanged("is_ampm", is_ampm !== selValue);
                                  }}
                                />
                              ) : (
                                <CustomTimer
                                  toggleTime={toggleChecked.is_time}
                                  timer={[
                                    {
                                      variant: "ampm",
                                      list: ampmList,
                                      time: ampm!,
                                      timeRef: ampmRef,
                                      onScroll: () => {
                                        onChangeScrollTime(ampmRef, ampmList, setAmpm, "is_ampm");
                                      },
                                    },
                                    {
                                      variant: "hour",
                                      list: hours,
                                      time: hour,
                                      timeRef: hourRef,
                                      onScroll: () => {
                                        onChangeScrollTime(hourRef, hours, setHour, "hour");
                                      },
                                    },
                                    {
                                      variant: "min",
                                      list: minutes,
                                      time: min,
                                      timeRef: minRef,
                                      onScroll: () => {
                                        onChangeScrollTime(minRef, minutes, setMin, "min");
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
              </div>
            </div>
          </div>
        </form>
      </div>
      {confirmOn ? (
        <ConfirmModal confirmOnly={true} message="공란 입니다" onConfirm={() => setConfirmOn(false)} />
      ) : null}
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
