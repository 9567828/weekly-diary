import { ChangeEvent, Dispatch, FormEvent, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import style from "./edittodo.module.scss";
import ToggleBtn from "@/components/ui/toggleBtn/ToggleBtn";
import TimePicker from "../(time)/TimePicker";
import ConfirmModal from "@/components/ui/confrimModal/ConfirmModal";
import ConfirmActionBtn from "@/components/ui/confirmActionBtn/ConfirmActionBtn";
import { AmPmType, EditTodoType, RepeatMapType } from "@/utils/supabase";
import { useEditTodoMutation } from "@/hooks/useMutation/useTodoMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/lib/hooks";
import { handleTodo } from "@/lib/slices/tabbarSlice";
import { createPortal } from "react-dom";
import CustomTimer from "./CustomTimer";
import { getScrollIndex, handleOnScroll, handleTodoInvalidateQueries, makeTimes } from "@/utils/handlers";
import { isMobile } from "react-device-detect";
import SelectRepeat from "@/components/ui/select-box/SelectRepeat";
import InputDate from "@/components/ui/InputDate";
import RepeatWrap from "@/app/(content)/(apps)/(todos)/(editTodo)/RepeatWrap";
import { lastDayOfMonth, parse } from "date-fns";
import { dateStr, parseDate, today, todayStr } from "@/components/calendar/drawWeek";
import EmptySpace from "@/components/ui/EmptySpace";
import CheckWrap from "./CheckWrap";

type toggleIdType = "is_import" | "is_time" | "is_month" | "is_until";
type toggleMap = Record<toggleIdType, boolean>;

type selectType = {
  src: string;
  title: "중요" | "시간" | "날짜" | "반복";
  toggleId: toggleIdType | null;
};

interface IEditTodo {
  id: string;
  text: string;
  is_import: boolean;
  is_time: boolean;
  time?: string;
  is_ampm?: AmPmType;
  todo_date?: string;
  is_month_end: boolean;
  day_of_week: number[];
  repeat_until: string | null;
  repeat_map: RepeatMapType;
  onClose: () => void;
}

const selectBox: selectType[] = [
  { src: "/imgs/icons/ic_important.svg", title: "중요", toggleId: "is_import" },
  { src: "/imgs/icons/ic_time.svg", title: "시간", toggleId: "is_time" },
  { src: "/imgs/icons/ic_calendar.svg", title: "날짜", toggleId: null },
  { src: "/imgs/icons/ic_repeat.svg", title: "반복", toggleId: null },
];

const ampmList = ["오전", "오전", "오후", "오후"];
const hours = makeTimes("hour");
const minutes = makeTimes("minute");

export default function EditTodo({ ...props }: IEditTodo) {
  const { id, text, is_import, is_time, time, is_ampm, todo_date, repeat_map, repeat_until, day_of_week, is_month_end, onClose } = props;
  let initRepeat: RepeatMapType;

  if (!repeat_map) {
    initRepeat = { label: "안함", value: "none" };
  } else {
    initRepeat = { label: repeat_map.label, value: repeat_map.value };
  }

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { mutate: edit } = useEditTodoMutation();
  const [mount, setMount] = useState(false);
  const [value, setValue] = useState(text);
  const [dateValue, setDateValue] = useState(todo_date);
  const [untilDate, setUntilDate] = useState(repeat_until ?? todayStr());
  const [selectRepeat, setSelectRepeat] = useState<RepeatMapType>(repeat_map ?? null);
  const [days, setDays] = useState<number[]>(day_of_week ?? []);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOn, setConfirmOn] = useState(false);
  const [toggleChecked, setToggleChecked] = useState<toggleMap>({
    is_import,
    is_time,
    is_month: is_month_end,
    is_until: repeat_until !== null,
  });
  const [ampm, setAmpm] = useState<AmPmType | null>(is_ampm ?? null);
  const getTime = () => {
    const h = time?.slice(0, 2);
    const m = time?.slice(3, 6);
    return { h, m };
  };

  type HasChangedKey = "text" | "is_import" | "is_time" | "is_ampm" | "hour" | "min" | "is_repeat" | "date" | "untilDate" | "is_month";
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
    untilDate: false,
    is_month: false,
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

  const closeEdit = () => {
    if (anyChanged) {
      setModalOpen(true);
    } else {
      onClose();
    }
  };

  const onChangeToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const targetId = e.target.id;
    const checked = e.target.checked;

    setToggleChecked((prev) => ({
      ...prev,
      [targetId]: checked,
    }));

    if (targetId === "is_month" && checked) {
      const lastDay = lastDayOfMonth(today());
      setDateValue(dateStr(lastDay));
    } else {
      setDateValue(todo_date);
    }

    if (targetId === "is_until" && !checked) {
      setUntilDate(todayStr());
    }

    const initialMap: Record<string, boolean> = {
      is_import,
      is_time,
      is_month: is_month_end,
      is_until: repeat_until !== null,
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
      is_month: "is_month",
      is_until: "untilDate",
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

  const onChangeScrollTime = (ref: RefObject<HTMLDivElement | null>, listArr: string[], setState: Dispatch<SetStateAction<any>>, changed: "is_ampm" | "hour" | "min") => {
    handleOnScroll(() => {
      const v = getScrollIndex(ref, listArr);
      setState(v);

      const compareValue = changed === "is_ampm" ? is_ampm : changed === "hour" ? getTime().h : getTime().m;

      handleHasChanged(changed, compareValue !== v);
    });
  };

  const handleSelectDays = (days: number) => {
    setDays((prev) => (prev.includes(days) ? prev.filter((d) => d !== days) : [...prev, days]));
  };

  const handleSelectRepeat = (opt: RepeatMapType) => {
    const newDays = parse(dateValue!, "yyyy-MM-dd", new Date()).getDay();

    if (opt.value === "weekday") {
      setDays([1, 2, 3, 4, 5]);
    }

    if (opt.value === "weekend") {
      setDays([0, 6]);
    }

    if (opt.value === "weekly" || opt.value === "biweekly") {
      setDays([newDays]);
    }

    if (opt.value === "none") {
      setDays([]);
    }
    setSelectRepeat({ value: opt.value, label: opt.label });

    const isChanged = selectRepeat.label !== opt.label || selectRepeat.value !== opt.value;
    handleHasChanged("is_repeat", isChanged);
  };

  useEffect(() => {
    const newDays = parse(dateValue!, "yyyy-MM-dd", new Date()).getDay();
    const isDaily = days.length === 7;
    const isWeekendOnly = days.length === 2 && days.every((d) => d === 0 || d === 6);
    const isWeekDay = days.length === 5 && days.every((d) => d >= 1 && d <= 5);

    if (selectRepeat.value === "weekly") {
      if (!days.length) {
        setDays([newDays]);
        return;
      }
      if (isDaily) {
        alert("매일로 변경 됩니다.");
        setDays([]);
        setSelectRepeat({ label: "매일", value: "daily" });
        return;
      }

      if (isWeekendOnly) {
        alert("주말로 변경 됩니다.");
        setDays([]);
        setSelectRepeat({ label: "주말", value: "weekend" });
        return;
      }

      if (isWeekDay) {
        alert("평일로 변경 됩니다.");
        setDays([]);
        setSelectRepeat({ label: "평일", value: "weekday" });
        return;
      }
    }

    if (selectRepeat.value === "biweekly") {
      if (!days.length) {
        setDays([newDays]);
        return;
      }
      if (isDaily) {
        setSelectRepeat({ label: "매일", value: "biweekly" });
        return;
      }
      if (isWeekendOnly) {
        setSelectRepeat({ label: "주말", value: "biweekly" });
        return;
      }
      if (isWeekDay) {
        setSelectRepeat({ label: "평일", value: "biweekly" });
        return;
      }
      setSelectRepeat({ label: "격주", value: "biweekly" });
    }
  }, [days, selectRepeat.value]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidTodoDate = isValidDate(dateValue!);

    if (!isValidTodoDate) {
      alert("날짜형식을 확인해 주세요 yyyy-mm-dd");
      return;
    }

    if (!anyChanged) {
      onClose();
      return;
    }

    if (value!.trim() === "") {
      setConfirmOn(true);
      return;
    }

    if (toggleChecked.is_until) {
      if (untilDate === "") {
        alert("반복종료 날짜 설정을 확인해 주세요");
        return;
      }
      if (untilDate === dateValue) {
        alert("종료일이 할 일 날짜와 같으면 반복이 적용되지 않습니다.");
        return;
      }
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
        is_repeat: selectRepeat.label !== "안함",
        is_month_end: toggleChecked.is_month,
        day_of_week: days.length <= 0 ? null : days,
        repeat_until: (untilDate === "" && !toggleChecked.is_until) || untilDate === dateValue ? null : untilDate,
        repeat_map: selectRepeat,
      },
      id,
    };

    edit(editObj, {
      onSuccess: (data) => {
        handleTodoInvalidateQueries(queryClient);
        onClose();
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
                  <textarea
                    className="text-area todo"
                    name="text"
                    id="text"
                    placeholder="내용을 입력하세요"
                    rows={2}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      handleHasChanged("text", text !== e.target.value);
                    }}
                    onFocus={() => dispatch(handleTodo("edit"))}
                    onBlur={() => dispatch(handleTodo(null))}
                  />

                  <div className={style["select-wrap"]}>
                    {selectBox.map((s, i) => {
                      const checked = toggleChecked[s.toggleId!] ?? false;

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
                                {s.title === "반복" && selectRepeat.value !== "none" && (
                                  <div className={style["repeat-text"]}>
                                    <img src="/imgs/icons/ic_repeat-small.svg" alt="반복아이콘" />
                                    <div>
                                      <p>{selectRepeat.value === "biweekly" && selectRepeat.label !== "격주" ? `격주 · ${selectRepeat.label}` : selectRepeat.label}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                              {s.title === "날짜" ? (
                                <InputDate
                                  id="todoDate"
                                  value={dateValue}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setDateValue(value);
                                    setDays([parseDate(value).getDay()]);
                                    handleHasChanged("date", value !== "");
                                  }}
                                />
                              ) : s.title === "반복" ? (
                                <SelectRepeat type={selectRepeat!} onSelect={handleSelectRepeat} />
                              ) : (
                                <ToggleBtn id={s.toggleId!} onChange={onChangeToggle} checked={checked} />
                              )}
                            </div>
                          </div>
                          {s.title === "반복" && (
                            <RepeatWrap repeatType={selectRepeat!} selectDays={days} onSelectDays={handleSelectDays}>
                              {selectRepeat.label === "매월" && (
                                <CheckWrap id="is_month" mode="nomal" text="말일" checked={toggleChecked.is_month} onChangeChecked={onChangeToggle} />
                              )}
                              {selectRepeat.value !== "none" && (
                                <CheckWrap
                                  id="is_until"
                                  mode="date"
                                  text="종료날짜"
                                  checked={toggleChecked.is_until}
                                  onChangeChecked={onChangeToggle}
                                  value={untilDate}
                                  onChangeDate={(e) => {
                                    const value = e.target.value;
                                    const todoDate = parse(dateValue!, "yyyy-MM-dd", new Date());
                                    const untilDate = parse(value, "yyyy-MM-dd", new Date());

                                    if (todoDate > untilDate) {
                                      alert("종료일은 할 일 날짜 이후로 설정해 주세요.");
                                      setUntilDate(todayStr());
                                      return;
                                    }

                                    setUntilDate(value);
                                    handleHasChanged("untilDate", value !== "");
                                  }}
                                />
                              )}
                            </RepeatWrap>
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
                {/* <EmptySpace addMargin /> */}
              </div>
            </div>
          </div>
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
          onConfirm={onClose}
        />
      ) : null}
    </>,
    document.body,
  );
}
