"use client";

import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/slices/userSlice";
import { signOut } from "@/utils/supabase/sql/auth";

export default function Page() {
  const dispath = useAppDispatch();

  const handSignOut = async () => {
    await signOut();
    dispath(logout);
  };

  return (
    <div className="scroll-wrap mypage">
      <h1>내 페이지</h1>
      <button onClick={handSignOut}>로그아웃</button>
    </div>
  );
}
