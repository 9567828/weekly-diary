import { ChangeEvent, Dispatch, EventHandler, FocusEvent, FormEvent, SetStateAction } from "react";

type InputEvents = ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement> | FormEvent<HTMLFormElement>;

export const vaildateCheck = (
  e: InputEvents,
  validators: Record<string, (value: string) => string>,
  error: Dispatch<SetStateAction<any>>
) => {
  const target = e.target as HTMLInputElement;
  const { name, value } = target;
  const validator = validators[name as keyof typeof validators];
  if (!validator) return;

  const msg = validator(value);
  error((prev: any) => ({
    ...prev,
    [name]: { isError: msg !== "", msg },
  }));
};
