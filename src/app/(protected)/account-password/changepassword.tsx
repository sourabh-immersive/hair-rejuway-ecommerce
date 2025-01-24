"use client";

import Label from "@/components/Label/Label";
import React, { useEffect, useRef, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useAppSelector } from "@/lib/hooks";
import { updateUserPassword } from "@/api/protected";

export interface PasswordChange {
  current_password: string;
  new_password: string;
  renew_password: string;
}

const ChangePassword = () => {
  const authState = useAppSelector((state) => state.auth);
  const [passwordData, setPasswordData] = useState<PasswordChange>({
    current_password: "",
    new_password: "",
    renew_password: "",
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    async function getPasswordUpdate() {
      const res = await updateUserPassword(
        authState.user?.token || "",
        passwordData
      );
      if (res?.status === true) {
        setSuccess('Password updated!')
        // setProfileInfo(res.data);
      }
    }
    if (passwordData) {
      getPasswordUpdate();
    }
  }, [authState, passwordData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    const formDataFromEvent = new FormData(formRef.current);
    const changeData = {
      current_password:
        formDataFromEvent.get("current_password")?.toString() || "",
      new_password: formDataFromEvent.get("new_password")?.toString() || "",
      renew_password: formDataFromEvent.get("renew_password")?.toString() || "",
    };

    const token = authState.user?.token || "";
    const response = await updateUserPassword(token, changeData);

    if (response.status === true) {
      setSuccess(response.data.message);
      setServerError('');
      formRef.current.reset();
    } else {
      setServerError(response.error.message);
      setSuccess('');
    }
    // console.log("response update updateUserPassword", response);
  };

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit}>
        <div className=" max-w-xl space-y-6">
          <div>
            <Label>Current password</Label>
            <Input
              name={"current_password"}
              type="password"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label>New password</Label>
            <Input name={"new_password"} type="password" className="mt-1.5" />
          </div>
          <div>
            <Label>Confirm password</Label>
            <Input name={"renew_password"} type="password" className="mt-1.5" />
          </div>
          <div className="pt-2">
            <ButtonPrimary type={"submit"}>Update password</ButtonPrimary>
          </div>
          {serverError && <p className="error text-red-600">{serverError}</p>}

          {success && <p className="error text-green-700">{success}</p>}
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
