import style from "./action.module.scss";

interface IBtn {
  onCancelClick: () => void;
  onSubmit: () => void;
}

export default function ConfirmActionBtn({ ...props }: IBtn) {
  return (
    <div className={style["btn-wrap"]}>
      <button className="cancel-btn" onClick={props.onCancelClick}>
        취소
      </button>
      <button className="txt-btn" onClick={props.onSubmit}>
        완료
      </button>
    </div>
  );
}
