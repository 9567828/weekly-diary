import Button from "@/components/ui/Button";
import { signInGoogle } from "@/utils/supabase/sql/auth";
import Logo from "@/components/ui/logo/Logo";

export default async function Login() {
  return (
    <>
      <Logo />
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
