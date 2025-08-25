"use client";

import Button from "@/components/ui/Button";
import style from "./accountformbtn.module.scss";
import { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

interface IBtns extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function AccountFormBtn({ label, ...rest }: IBtns) {
  const router = useRouter();
  return (
    <div className={style["btn-wrap"]}>
      <Button {...rest} label={label} variant="primary-btn" />
      <button className="back-btn" onClick={() => router.back()}>
        돌아가기
      </button>
    </div>
  );
}
