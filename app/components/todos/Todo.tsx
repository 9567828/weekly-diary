import style from "../../../styles/components/todos/todo.module.scss";
import CheckBtn from "../ui/CheckBtn";
import Button from "../ui/Button";

// type TodoProps = { id: string; label: string } & ({ isTime: true; time: string } | { isTime?: false });

interface IChkBtn {
  id: string;
  label: string;
}

type RequiredTimeProp = {
  isTime: true;
  time: string;
};

type OptionalTimeProp = {
  isTime: false;
  time?: never;
};

type Props = IChkBtn & (RequiredTimeProp | OptionalTimeProp);

export default function Todo({ id, label, isTime, time }: Props) {
  // const { id, label, isTime, } = props;
  return (
    <div className={style["position"]}>
      {/* <CheckBtn id={id} label={label} {...(props.isTime ? { isTime: true, time: props.time } : { isTime: false })} /> */}
      <CheckBtn id={id}>
        <p className={style["label"]}>{label}</p>
        {isTime ? (
          <div className={style["time-line"]}>
            <img src="/imgs/icons/ic_clock.svg" alt="시간" />
            <p className={style["time"]}>{time}</p>
          </div>
        ) : null}
      </CheckBtn>
      <div className={style["btn-wrap"]}>
        <Button isTxtBtn={false} existImg={true} src="/imgs/icons/ic_edit.svg" alt="투두수정" classNameKey={"edit-btn"} />
        <Button isTxtBtn={false} existImg={true} src="/imgs/icons/ic_trash.svg" alt="투두삭제" classNameKey={"del-btn"} />
      </div>
    </div>
  );
}
