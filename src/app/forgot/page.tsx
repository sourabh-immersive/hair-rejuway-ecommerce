import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ForgotForm from "./forgotform";


const Forgot = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/account");
  }

  return (
    <>
      <ForgotForm />
    </>
  );
};

export default Forgot;