import style from "./errormsg.module.scss";

interface IMsg {
  text: string | undefined;
  className?: keyof typeof style;
}

export default function ErrorMsg({ text, className }: IMsg) {
  return <p className={`${style["error-msg"]} ${className ? style[className] : ""}`.trim()}>{text}</p>;
}
