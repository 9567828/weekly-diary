import { FormEvent } from "react";

export const inputBlur = (e: FormEvent<HTMLFormElement>) => {
  const form = e.currentTarget;
  console.log(form);
  const input = form.querySelector("input");
  input?.blur();
};
