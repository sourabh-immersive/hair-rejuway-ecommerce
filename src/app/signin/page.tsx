import { auth } from "@/auth";
import LoginForm from "./loginform";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/account");
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default SignIn;