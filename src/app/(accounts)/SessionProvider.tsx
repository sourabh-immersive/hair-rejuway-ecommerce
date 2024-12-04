import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider = async ({ children }: SessionProviderProps) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return <>{children}</>;
};

export default SessionProvider;