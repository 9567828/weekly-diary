import { MouseEvent } from "react";

interface IbaseBtn {
  label?: string;
  variant?: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
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

type Props = IbaseBtn & (ImgRequired | ImgAbsent);

export default function Button({ label, variant, className, existImg, src, alt, onClick }: Props) {
  return (
    <button className={`${variant ? variant : ""} ${className ? className : ""}`.trim()} onClick={onClick}>
      {existImg ? <img src={src} alt={alt} /> : null}
      {label ? <p>{label}</p> : null}
    </button>
  );
}
