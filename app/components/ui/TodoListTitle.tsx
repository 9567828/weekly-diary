import style from "../../../styles/components/ui/todolisttitle.module.scss";

interface IProps {
  title: string;
  number: number;
}

export default function TodoListTitle({ title, number = 0 }: IProps) {
  return (
    <div className={style["flex"]}>
      <p>{title}</p>
      <p>{`(${number})`}</p>
    </div>
  );
}
