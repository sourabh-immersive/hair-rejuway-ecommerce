import Label from "@/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import ChangePassword from "./changepassword";

const AccountPass = () => {
  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Update your password
      </h2>
      <ChangePassword />
    </div>
  );
};

export default AccountPass;
