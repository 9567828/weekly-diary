import "@/styles/components/ui/buttons.scss";
import { ButtonHTMLAttributes, RefObject } from "react";

interface IbaseBtn extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: string;
  className?: string;
  btnRef?: RefObject<HTMLButtonElement | null>;
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

export default function Button({ label, btnRef, variant, className, existImg, src, alt, ...rest }: Props) {
  return (
    <button {...rest} ref={btnRef} className={`${variant ? variant : ""} ${className ? className : ""}`.trim()}>
      {existImg ? <img src={src} alt={alt} /> : null}
      {label ? <p>{label}</p> : null}
    </button>
  );
}
