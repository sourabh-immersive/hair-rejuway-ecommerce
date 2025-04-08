"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import googleSvg from "@/images/Google.svg";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { initializeSession } from "@/lib/features/authSlice/authSlice";
import { object, string, z } from "zod";
import Logo from "@/shared/Logo/Logo";
import {
  doCredentialLogin,
  doSocialLogin,
  getSessionData,
} from "@/app/server-actions/actions";

const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

interface LoginValues {
  email: string;
  password: string;
}

const loginSocials = [
  // {
  //   name: "Continue with Facebook",
  //   href: "#",
  //   icon: facebookSvg,
  //   value: "facebook"
  // },
  // {
  //   name: "Continue with Twitter",
  //   href: "#",
  //   icon: twitterSvg,
  //   value: "twitter"
  // },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
    value: "google",
  },
];

const LoginForm = () => {
  //   const session = useSession();
  //   if (session.status) {
  //     redirect("/");
  //   }
  const router = useRouter();
  const [error, setError] = useState<Record<string, string[]>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({});
    setServerError(null);

    try {
      const formData = new FormData(event.currentTarget);

      // Extract form data
      const formValues = {
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
      };

      // Validate form values using Zod
      const validationResult = signInSchema.safeParse(formValues);

      if (!validationResult.success) {
        // Extract and set validation errors
        const fieldErrors = validationResult.error.flatten().fieldErrors;
        console.error("Validation errors:", fieldErrors);
        setError(fieldErrors); // Update error state with validation errors
        return;
      }

      // Proceed with API call if validation passes
      const response = await doCredentialLogin(formValues);

      if (!!response.error) {
        console.error(response.error);
        setServerError(response.error.message);
      } else {
        const sessionData = await getSessionData();
        // console.log("Session data:", sessionData);

        if (sessionData?.user) {
          const user = {
            id: sessionData.user.id || "",
            name: sessionData.user.name || "",
            email: sessionData.user.email || "",
            token: sessionData.user.apiToken || "",
          };
          dispatch(initializeSession(user));
        } else {
          dispatch(initializeSession(null));
        }

        // router.push("/");
      }
    } catch (e) {
      console.error(e);
      setServerError("Check your credentials");
    }
  };

  const googleLoginHandler = async (formData: any) => {
    const googleLoginData = await doSocialLogin(formData);
    // console.log("googleLoginData", googleLoginData);
  };

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container border border-gray-200 p-6 rounded-lg mb-6">
        <h2 className="mb-8 flex items-center text-2xl leading-[115%] md:text-2xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign in to Your Account
        </h2>
        <div className="space-y-6">
          {/* FORM */}

          <form onSubmit={onSubmit} className="grid grid-cols-3 gap-4">
            <input
              name="email"
              type="email"
              className="border border-gray-200 rounded-md p-3"
              placeholder="Enter your email"
            />
            {error?.email && (
              <p className="error text-red-600">{error.email[0]}</p>
            )}
            <input
              name="password"
              type="password"
              className="border border-gray-200 rounded-md p-3"
              placeholder="Enter your password"
            />
            {error?.password && (
              <p className="error text-red-600">{error.password[0]}</p>
            )}
            <ButtonPrimary type="submit">Login</ButtonPrimary>
            {serverError && <p className="error text-red-600">{serverError}</p>}
          </form>

          <div className="flex justify-between items-center mt-4">
            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              New user? {` `}
              <Link
                className="text-green-600 mr-2"
                href="/register"
                prefetch={true}
              >
                Create an account
              </Link>
              Lost password? {` `}
              <Link className="text-green-600" href="/forgot" prefetch={true}>
                Forgot password
              </Link>
            </span>

            <div className="grid gap-3">
              <form action={googleLoginHandler}>
                {loginSocials.map((item, index) => (
                  <button
                    key={index}
                    type="submit"
                    name="action"
                    value={item.value}
                    className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                  >
                    <Image
                      className="flex-shrink-0 mr-4"
                      src={item.icon}
                      alt={item.name}
                      sizes="50px"
                    />
                    <h3 className="flex-grow text-center text-base font-medium text-neutral-700 dark:text-neutral-300">
                      {item.name}
                    </h3>
                  </button>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
