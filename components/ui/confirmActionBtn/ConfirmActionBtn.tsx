import style from "./action.module.scss";

interface IBtn {
  onCancelClick: () => void;
}

export default function ConfirmActionBtn({ ...props }: IBtn) {
  return (
    <div className={style["btn-wrap"]}>
      <button type="button" className="cancel-btn" onClick={props.onCancelClick}>
        취소
      </button>
      <button type="submit" className="txt-btn">
        완료
      </button>
    </div>
  );
}
