import { InputHTMLAttributes } from "react";

interface IdateProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function InputDate({ ...props }: IdateProps) {
  return <input {...props} type="date" className="input-date" pattern="\d{4}-\d{2}-\d{2}" min="2000-01-01" max="2100-12-31" />;
}
