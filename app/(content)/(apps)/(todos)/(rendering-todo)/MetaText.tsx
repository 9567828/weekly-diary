import style from "./todo.module.scss";

interface IMetaProps {
  alt: "반복" | "시간";
  text: string;
  icon: string;
}

export default function MetaText({ text, alt, icon }: IMetaProps) {
  return (
    <div className={style["meta-wrap"]}>
      <img src={`/imgs/icons/${icon}.svg`} alt={alt} />
      <p className={style.meta}>{text}</p>
    </div>
  );
}
