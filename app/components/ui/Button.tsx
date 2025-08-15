import style from "../../../styles/components/ui/button.module.scss";

interface IbaseBtn {
  classNameKey?: keyof typeof style;
  onClick?: () => void;
}

type ImgRequired = {
  existImg: true;
  src: string;
  alt: string;
};

type ImgAbsent = {
  existImg?: false;
  src?: never;
  alt?: never;
};

type TxtRequired = {
  isTxtBtn: true;
  label: string;
};

type TxtAbsent = {
  isTxtBtn: false;
  label?: never;
};

type Props = IbaseBtn & (ImgRequired | ImgAbsent) & (TxtRequired | TxtAbsent);

export default function Button({ classNameKey, existImg, src, alt, isTxtBtn, label, onClick }: Props) {
  return (
    <button className={`${isTxtBtn ? style.txtBtn : ""} ${style[classNameKey ?? ""]}`} onClick={onClick}>
      {existImg ? <img src={src} alt={alt} /> : null}
      {isTxtBtn ? <p>{label}</p> : null}
    </button>
  );
}
