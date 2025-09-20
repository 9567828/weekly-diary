import style from "./modal.module.scss";
import Button from "../Button";

interface IButtn {
  message: string;
  onCancel?: () => void;
  onConfirm: () => void;
  confirmOnly: boolean;
}

export default function ConfirmModal({ message, onCancel, onConfirm, confirmOnly }: IButtn) {
  return (
    <div className={style.bg}>
      <div className={style["modal-warp"]}>
        <p className={style["modal-txt"]}>{message}</p>
        <div className={style["btn-wrap"]}>
          {confirmOnly ? (
            <Button onClick={onConfirm} label="확인" className="primary-btn modal-btn" />
          ) : (
            <>
              <Button onClick={onCancel} label="취소" className={`primary-btn modal-btn cancel`} />
              <Button onClick={onConfirm} label="확인" className={`primary-btn modal-btn`} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
