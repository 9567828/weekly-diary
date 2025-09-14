import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const hour12Regex = /^(0[1-9]|1[0-2])$/;
export const hour24Regex = /^(?:[01][0-9]|2[0-3])$/;
export const minRegex = /^([0-5][0-9])$/;

export const onChangePhone = (e: ChangeEvent<HTMLInputElement>, setPhone: Dispatch<SetStateAction<string>>) => {
  const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
  const formatted = onlyNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  setPhone(formatted);
};

export const onChangeEmail = (
  e: ChangeEvent<HTMLInputElement>,
  setEmail: Dispatch<SetStateAction<string>>,
  setIsEmail: Dispatch<SetStateAction<boolean>>
) => {
  const value = e.target.value;
  const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  setEmail(value);
  if (emailRegex.test(value)) {
    setIsEmail(true);
  } else {
    setIsEmail(false);
  }
};

export const onChangeRegex = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>,
  setIsRegex: Dispatch<SetStateAction<boolean>>,
  regex: RegExp
) => {
  const value = e.target.value;
  setValue(value);
  if (regex.test(value)) {
    setIsRegex(true);
  } else {
    setIsRegex(false);
  }
};
