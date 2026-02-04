"use client";

import style from "./edit.module.scss";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type ModeType = "todo" | "normal";

export default function ModalLayout({ children, mode }: { children: React.ReactNode; mode: ModeType }) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return createPortal(
    <div className={style.dim}>
      <div className={`${style["modal-wrap"]} ${mode === "todo" ? style.todo : style.normal}`.trim()}>{children}</div>
    </div>,
    document.body,
  );
}
