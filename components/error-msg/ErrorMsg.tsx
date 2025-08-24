import style from "./errormsg.module.scss";

interface IMsg {
  text: string;
  variant?: keyof typeof style;
}

export default function ErrorMsg({ text, variant }: IMsg) {
  return <p className={`${style["error-msg"]} ${variant ? style[variant] : ""}`.trim()}>{text}</p>;
}
