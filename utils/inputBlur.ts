import { FormEvent } from "react";

export const inputBlur = (e: FormEvent) => {
  const form = e.currentTarget;
  const input = form.querySelector("input");
  input?.blur();
};
