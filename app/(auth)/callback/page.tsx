"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function CallbackPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // 로그인 성공 → 프로필 업데이트
        const user = session.user;
        await supabase.from("profiles").upsert({
          user_uid: user.id,
          avatar_url: user.user_metadata.avatar_url,
        });
        // 홈으로 이동
        router.replace("/");
      } else {
        // 로그인 실패
        setLoading(false);
        return;
      }
    };
    run();
  }, [router]);

  if (loading) return <p>로그인 처리중...</p>;

  return (
    <div>
      <p>로그인에 실패했습니다.</p>
      <button onClick={() => router.push("/login")}>다시 로그인</button>
    </div>
  );
}
