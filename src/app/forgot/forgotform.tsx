"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/shared/Logo/Logo";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useRouter } from "next/navigation";
import { forgotChangePassword, forgotSendOtp } from "@/api/auth";
import { AnimatePresence, motion } from "framer-motion";

const ForgotForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{
    user_id: string;
    reset_token: string;
    new_password: string;
    confirm_password: string;
  }>({ user_id: "", reset_token: "", new_password: "", confirm_password: "" });

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await forgotSendOtp({ phone: phone });
      console.log("otp:", response.data.reset_token);
      alert("Your one-time OTP is: " + response.data.reset_token);
      if (response.status === true) {
        setUserInfo((prev) => ({
          ...prev,
          user_id: response.data.user_id,
        }));
        setStep(2);
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      setUserInfo((prev) => ({
        ...prev,
        reset_token: otp,
      }));
      setStep(3);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const updatedUserInfo = {
      ...userInfo,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    try {
      const response = await forgotChangePassword(updatedUserInfo);
      if (response.status === true) {
        setSuccess(response.data.message);
        setTimeout(() => {
          router.push("/signin");
        }, 3000);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to reset password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const Loader = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50"
      >
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="nc-PageLogin" data-nc-id="PageLogin">
      <div className="container my-10 lg:my-12">
        <div className="mx-auto text-center mb-4">
          <Logo />
        </div>

        <h2 className="mb-8 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 text-center">
          Forgot Account Password
        </h2>
        <div className="max-w-md mx-auto space-y-6 relative">
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
          {loading && <Loader />}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="grid grid-cols-1 gap-4">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-200 rounded-md p-3"
                placeholder="Enter phone number"
                disabled={loading}
              />
              <ButtonPrimary type="submit" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </ButtonPrimary>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-200 rounded-md p-3"
                placeholder="Enter OTP"
                disabled={loading}
              />
              <ButtonPrimary type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </ButtonPrimary>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="grid grid-cols-1 gap-4">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-200 rounded-md p-3"
                placeholder="New Password"
                disabled={loading}
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-200 rounded-md p-3"
                placeholder="Confirm Password"
                disabled={loading}
              />
              <ButtonPrimary type="submit" disabled={loading}>
                {loading ? "Resetting Password..." : "Reset Password"}
              </ButtonPrimary>
            </form>
          )}

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Existing User?{" "}
            <Link href="/signin" className="text-green-600">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotForm;