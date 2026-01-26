"use client";

import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/slices/userSlice";
import { signOut } from "@/utils/supabase/sql/auth";
import WrapperLayout from "./../WrapperLayout";

export default function Page() {
  const dispatch = useAppDispatch();

  const handSignOut = async () => {
    await signOut();
    dispatch(logout);
  };

  return (
    <WrapperLayout>
      <h1>내 페이지</h1>
      <button onClick={handSignOut}>로그아웃</button>
    </WrapperLayout>
  );
}
