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

interface Values {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full Name is too short!")
    .max(100, "Full Name is too long!")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const PageSignUp = () => {
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Register
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  sizes="40px"
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
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
              fullName: "",
              email: "",
              phone: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            <Form className="grid grid-cols-1 gap-4">
              <Field
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                className="border border-gray-200 rounded-md p-3"
              />
              <ErrorMessage
                name="fullName"
                component="span"
                className="text-sm text-[#FF0000]"
              />
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
                id="phone"
                name="phone"
                placeholder="Phone Number"
                type="tel"
                className="border border-gray-200 rounded-md p-3"
              />
              <ErrorMessage
                name="phone"
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
            </Form>
          </Formik>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link className="text-green-600" href="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
