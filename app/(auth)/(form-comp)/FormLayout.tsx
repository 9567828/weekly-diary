import React, { FormEvent, MouseEvent } from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface IFormLayout {
  pageTitle: string;
  children?: React.ReactNode;
  formClass?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  btnLabel: string;
  disabled?: boolean;
}

export default function FormLayout({ pageTitle, children, onSubmit, formClass, btnLabel, disabled }: IFormLayout) {
  const router = useRouter();

  return (
    <>
      <h1 className="account-title">{pageTitle}</h1>
      <form className={`form-container ${formClass ? formClass : ""}`.trim()} onSubmit={onSubmit}>
        {children}
        <div className="form-btn-wrap">
          <Button type="submit" label={btnLabel} variant="primary-btn" disabled={disabled} />
          <button className="back-btn" onClick={() => router.back()}>
            돌아가기
          </button>
        </div>
      </form>
    </>
  );
}
