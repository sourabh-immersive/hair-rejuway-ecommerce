"use client";

import React, { useState } from "react";
import Link from "next/link";
import googleSvg from "@/images/Google.svg";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { z } from "zod";
import {
  RegistrationData,
  UserRegistration,
  UserRegistrationVerifyOtp,
} from "@/api/auth";
import { doSocialLogin } from "../server-actions/actions";
import Logo from "@/shared/Logo/Logo";

// Zod Schema for Form Validation
const signInSchema = z.object({
  fullname: z.string().min(1, "Name is required").trim(),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .trim(),
  phone: z.string().min(10, "Invalid phone number").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must include an uppercase, lowercase, number, and special character"
    )
    .trim(),
});

interface RegValues {
  fullname: string;
  email: string;
  phone: string;
  password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<Record<string, string[]>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState<RegistrationData>({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({});
    setServerError(null);

    const formDataFromEvent = new FormData(event.currentTarget);

    if (!otpSent) {
      try {
        const formValues = {
          email: formDataFromEvent.get("email")?.toString() || "",
          password: formDataFromEvent.get("password")?.toString() || "",
          fullname: formDataFromEvent.get("fullname")?.toString() || "",
          phone: formDataFromEvent.get("phone")?.toString() || "",
          otp: "",
        };

        const validationResult = signInSchema.safeParse(formValues);
        if (!validationResult.success) {
          const fieldErrors = validationResult.error.flatten().fieldErrors;
          setError(fieldErrors);
          return;
        }

        const response = await UserRegistration(formValues);
        if (response.status === true) {
          setOtpSent(true);
          setFormData(formValues);
          //   event.currentTarget.reset();
        } else {
          setServerError(response.error);
        }
      } catch (e) {
        console.error(e);
        setServerError("Error sending OTP!");
      }
    } else {
      try {
        const otpValue = otp;
        const response = await UserRegistrationVerifyOtp({
          ...formData,
          otp: otpValue,
        });
        if (response.status === true) {
          //   alert("User registered successfully!");
          setSuccess(true);
          setTimeout(() => {
            router.push("/signin");
          }, 3000);
        } else {
          setSuccess(false);
          setServerError("Invalid OTP, please try again.");
        }
      } catch (e) {
        console.error(e);
        setServerError("Error verifying OTP!");
      }
    }
  };

  //   const googleLoginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     try {
  //       const response = await doSocialLogin({ provider: "google" });
  //       console.log("Google login response:", response);
  //       if (response?.success) {
  //         router.push("/dashboard");
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       setServerError("Google login failed. Please try again.");
  //     }
  //   };

  const googleLoginHandler = async (formData: any) => {
    const googleLoginData = await doSocialLogin(formData);
    console.log("googleLoginData", googleLoginData);
  };

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container my-10 lg:my-12">
        <div className="mx-auto text-center mb-4">
          <Logo />
        </div>
        <h2 className="mb-8 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 text-center">
          Register Your Account
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
            {!otpSent ? (
              <>
                <input
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  className="border border-gray-200 rounded-md p-3"
                  placeholder="Enter your full name"
                />
                {error?.fullname && (
                  <p className="error text-red-600">
                    {error.fullname.join(", ")}
                  </p>
                )}
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border border-gray-200 rounded-md p-3"
                  placeholder="Enter your email"
                />
                {error?.email && (
                  <p className="error text-red-600">{error.email.join(", ")}</p>
                )}
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="border border-gray-200 rounded-md p-3"
                  placeholder="Phone Number"
                />
                {error?.phone && (
                  <p className="error text-red-600">{error.phone.join(", ")}</p>
                )}
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="border border-gray-200 rounded-md p-3"
                  placeholder="Enter your password"
                />
                {error?.password && (
                  <p className="error text-red-600">
                    {error.password.join(", ")}
                  </p>
                )}
              </>
            ) : (
              <>
                <input
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border border-gray-200 rounded-md p-3"
                  placeholder="Enter the OTP"
                />
              </>
            )}

            <ButtonPrimary type="submit">
              {!otpSent ? "Send OTP" : "Verify OTP"}
            </ButtonPrimary>
            {serverError && <p className="error text-red-600">{serverError}</p>}

            {success && (
              <p className="error text-green-700">
                {"User registered successfully!"}
              </p>
            )}
          </form>

          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>

          <div className="grid gap-3">
            <form onSubmit={googleLoginHandler}>
              <button
                type="submit"
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={googleSvg}
                  alt="Continue with Google"
                  width={20}
                  height={20}
                />
                <span className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Continue with Google
                </span>
              </button>
            </form>
          </div>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Existing User?{" "}
            <Link className="text-green-600" href="/signin" prefetch={true}>
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
