import style from "./modal.module.scss";
import Button from "../Button";

interface IButtn {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({ ...props }: IButtn) {
  return (
    <div className={style.bg}>
      <div className={style["modal-warp"]}>
        <p className={style["modal-txt"]}>변경사항을 폐기하시겠습니까?</p>
        <div className={style["btn-wrap"]}>
          <Button onClick={props.onCancel} label="취소" className={`primary-btn modal-btn cancel`} />
          <Button onClick={props.onConfirm} label="확인" className={`primary-btn modal-btn`} />
        </div>
      </div>
    </div>
  );
}
