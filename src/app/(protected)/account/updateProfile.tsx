"use client";

import Label from "@/components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import { avatarImgs } from "@/contains/fakeData";
import Image from "next/image";
import { getProfileDetails, updateProfile } from "@/api/protected";
import { useAppSelector } from "@/lib/hooks";

export interface ProfileInfo {
  id: number;
  name: string;
  phone: string;
  email: string;
  propic: string;
  address: string;
}

const UpdateProfile = () => {
  const authState = useAppSelector((state) => state.auth);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    async function getProfileInfo() {
      const res = await getProfileDetails(authState.user?.token || "");
      if (res.status === true) {
        setProfileInfo(res.data);
      }
    }
    getProfileInfo();
  }, [authState]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataFromEvent = new FormData(event.currentTarget);

    const token = authState.user?.token || "";
    const response = await updateProfile(token, formDataFromEvent);
    console.log("response update profile", response);

    if (response.status === true) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          {/* AVATAR */}

          <div className="relative rounded-full overflow-hidden flex">
            <Image
              src={profileInfo?.propic || avatarImgs[2]}
              alt="avatar"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mt-1 text-xs">Change Image</span>
            </div>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <div>
            <Label>Full name</Label>
            <p>{}</p>
            <Input
              name={"name"}
              className="mt-1.5"
              defaultValue={profileInfo?.name}
            />
          </div>

          <div>
            <Label>Email</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-envelope"></i>
              </span>
              <Input
                name={"email"}
                className="!rounded-l-none"
                placeholder="example@email.com"
                defaultValue={profileInfo?.email}
              />
            </div>
          </div>

          {/* <div className="max-w-lg">
            <Label>Date of birth</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-calendar"></i>
              </span>
              <Input
                className="!rounded-l-none"
                type="date"
                defaultValue="1990-07-22"
              />
            </div>
          </div> */}

          <div>
            <Label>Addess</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-map-signs"></i>
              </span>
              <Input
                name={"address"}
                className="!rounded-l-none"
                defaultValue={profileInfo?.address}
              />
            </div>
          </div>

          {/* <div>
            <Label>Gender</Label>
            <Select className="mt-1.5">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div> */}

          <div>
            <Label>Phone number</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-phone-volume"></i>
              </span>
              <Input
                name={"phone"}
                className="!rounded-l-none"
                defaultValue={profileInfo?.phone}
              />
            </div>
          </div>

          <div className="pt-2">
            <ButtonPrimary type={"submit"}>Update Account</ButtonPrimary>
          </div>

          {success && <p className="text-green-700 font-medium">Profile Updated!</p>}
        </div>
      </div>
    </form>
  );
};

export default UpdateProfile;
