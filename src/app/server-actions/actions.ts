"use server";

import { auth, signIn, signOut } from "@/auth";

export async function isAuthenticated(): Promise<
  "authenticated" | "unauthenticated"
> {
  const session = await auth();

  if (session?.user) {
    return "authenticated";
  }
  return "unauthenticated";
}

export async function doSocialLogin(formData: any) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}

export async function doLogout() {
  //   localStorage.removeItem("authToken");
  await signOut({ redirectTo: '/', redirect:true });
}

export async function AddApiToken(token: any) {
  localStorage.setItem("authToken", token);
}

export async function doCredentialLogin(formData: any) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return response;
  } catch (err) {
    throw err;
  }
}
