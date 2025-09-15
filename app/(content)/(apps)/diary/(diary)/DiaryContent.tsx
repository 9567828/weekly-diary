import style from "../diary.module.scss";
import Button from "@/components/ui/Button";

interface IDiary {
  title: string;
  text: string;
}

export default function DiaryContent({ title, text }: IDiary) {
  return (
    <>
      <div className={style["content-head"]}>
        <p className={style.title}>{title}</p>
        <Button existImg={true} src="/imgs/icons/ic_edit-24.svg" alt="수정" className="btn-24" />
      </div>
      <form action="">
        {/* <ConfirmActionBtn onCancelClick={cancelClick} /> */}
        <div className={style["content-diary"]}>
          <p>{text}</p>
        </div>
      </form>
    </>
  );
}
