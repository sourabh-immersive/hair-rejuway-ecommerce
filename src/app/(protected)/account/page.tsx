import React, { FC } from "react";
import UpdateProfile from "./updateProfile";

const AccountPage = async () => {
  return (
    <div className={`nc-AccountPage `}>
      <div className="space-y-10 sm:space-y-12">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Account infomation
        </h2>
        <UpdateProfile />
      </div>
    </div>
  );
};

export default AccountPage;
