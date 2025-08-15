"use client";

import { ChangeEvent, useState } from "react";
import style from "../../../styles/components/ui/inputbox.module.scss";

interface IInput {
  placeholder?: string;
}

export default function InputBox({ placeholder }: IInput) {
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <label className={style["input-box"]}>
      <input type="text" name="" id="" value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  );
}
