"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import * as Yup from "yup";
import { auth, signIn } from "@/auth";
import {
  doCredentialLogin,
  doLogout,
  doSocialLogin,
  isAuthenticated,
} from "../server-actions/actions";
import { redirect, useRouter } from "next/navigation";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import { SigninFormSchema } from "@/lib/definitions";
import { useSession, SessionProvider } from "next-auth/react";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 8 characters long")
    .required("Password is required"),
});

interface LoginValues {
  email: string;
  password: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
    value: "facebook"
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
    value: "twitter"
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
    value: "google"
  },
];

const LoginForm = () => {
//   const session = useSession();
//   if (session.status) {
//     redirect("/");
//   }
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: any) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      //   const validatedFields = SigninFormSchema.safeParse({
      //     // name: formData.get('name'),
      //     email: formData.get("email"),
      //     password: formData.get("password"),
      //   });

      //   // If any form fields are invalid, return early
      //   if (!validatedFields.success) {
      //     return {
      //       errors: validatedFields.error.flatten().fieldErrors,
      //     };
      //   }

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/account");
        // console.log('tokenff', session?.apiToken)
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }
  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
        <form action={doSocialLogin}>
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <button
                key={index}
                type="submit" name="action" value={item.value}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                  sizes="40px"
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </button>
            ))}
          </div>
          </form>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}

          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
            <input
              name="email"
              type="email"
              className="border border-gray-200 rounded-md p-3"
              placeholder="Enter your email"
            />
            <input
              name="password"
              type="password"
              className="border border-gray-200 rounded-md p-3"
              placeholder="Enter your password"
            />
            <ButtonPrimary type="submit">Login</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link className="text-green-600" href="/signup">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;