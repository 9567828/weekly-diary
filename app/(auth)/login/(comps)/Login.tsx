import style from "./login.module.scss";
import Button from "@/components/ui/Button";
import { signInGoogle } from "@/utils/supabase/sql/auth";

export default async function Login() {
  return (
    <>
      <div className={style.head}>
        <img src="/imgs/pencil-second.svg" alt="아이콘" />
        <h1 className={style.headTitle}>weekly diary</h1>
      </div>
      <form style={{ width: "100%" }}>
        <Button
          type="submit"
          existImg={true}
          src="/imgs/icons/Google-logo.svg"
          alt="구글로그인"
          label="구글 로그인"
          variant="google-btn"
          formAction={signInGoogle}
        />
      </form>
    </>
  );
}
