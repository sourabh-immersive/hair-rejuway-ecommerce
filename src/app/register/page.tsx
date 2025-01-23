import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./registerform";

const Register = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/account");
  }

  return (
    <>
      <RegisterForm />
    </>
  );
};

export default Register;