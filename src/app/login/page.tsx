"use client";

import React, { FC } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAuthError,
  getAuthStatus,
} from "@/lib/features/authSlice/authSlice";
import { loginUser } from "@/lib/actions/authActions";

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
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const authError = useAppSelector(getAuthError);

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
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
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(
              values: LoginValues,
              { setSubmitting }: FormikHelpers<LoginValues>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                dispatch(loginUser(values));
              }, 500);
            }}
          >
            <Form className="grid grid-cols-1 gap-4">
              <Field
                id="email"
                name="email"
                placeholder="Email Address"
                type="email"
                className="border border-gray-200 rounded-md p-3"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-sm text-[#FF0000]"
              />
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                className="border border-gray-200 rounded-md p-3"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="text-sm text-[#FF0000]"
              />

              <ButtonPrimary type="submit">Continue</ButtonPrimary>

              {authStatus === "loading" && <p>Loading...</p>}
              {authError && <p style={{ color: "red" }}>{authError}</p>}
            </Form>
          </Formik>

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

export default PageLogin;
