import style from "./modal.module.scss";
import Button from "../Button";

interface IButtn {
  message: string;
  onCancel?: () => void;
  onConfirm: () => void;
  confirmOnly: boolean;
}

export default function ConfirmModal({ ...props }: IButtn) {
  return (
    <div className={style.bg}>
      <div className={style["modal-warp"]}>
        <p className={style["modal-txt"]}>{props.message}</p>
        <div className={style["btn-wrap"]}>
          {props.confirmOnly ? (
            <Button onClick={props.onConfirm} label="확인" className="primary-btn modal-btn" />
          ) : (
            <>
              <Button onClick={props.onCancel} label="취소" className={`primary-btn modal-btn cancel`} />
              <Button onClick={props.onConfirm} label="확인" className={`primary-btn modal-btn`} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
