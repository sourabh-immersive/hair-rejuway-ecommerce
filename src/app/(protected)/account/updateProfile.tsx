"use client";

import Label from "@/components/Label/Label";
import React, { useEffect, useState, ChangeEvent } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
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
  const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch profile details on mount
  useEffect(() => {
    async function getProfileInfo() {
      const res = await getProfileDetails(authState.user?.token || "");
      if (res.status === true) {
        setProfileInfo(res.data);
        setPreviewUrl(res.data.propic); // Set initial preview
      }
    }
    getProfileInfo();
  }, [authState.user?.token]);

  // Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 0) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", (event.currentTarget.elements.namedItem("name") as HTMLInputElement).value);
    formData.append("email", (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value);
    formData.append("address", (event.currentTarget.elements.namedItem("address") as HTMLInputElement).value);
    formData.append("phone", (event.currentTarget.elements.namedItem("phone") as HTMLInputElement).value);

    // Match server expected key 'photo' instead of 'propic'
    if (selectedImage) {
      formData.append("photo", selectedImage);
    }

    const token = authState.user?.token || "";
    setStatus("loading");

    try {
      const response = await updateProfile(token, formData);
      console.log("response update profile", response);

      if (response.status === true) {
        setStatus("succeeded");
        setProfileInfo(response.data); // Update with server response if provided
        setSelectedImage(null); // Clear selected image
        setPreviewUrl(response.data?.propic || previewUrl); // Update preview
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      setStatus("failed");
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          {/* AVATAR */}
          <div className="relative rounded-full overflow-hidden flex w-32 h-32">
            <Image
              src={previewUrl || profileInfo?.propic || avatarImgs[2]}
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
              name="photo" // Match server expected key
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <div>
            <Label>Full name</Label>
            <Input
              name="name"
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
                name="email"
                className="!rounded-l-none"
                placeholder="example@email.com"
                defaultValue={profileInfo?.email}
              />
            </div>
          </div>

          <div>
            <Label>Address</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-map-signs"></i>
              </span>
              <Input
                name="address"
                className="!rounded-l-none"
                defaultValue={profileInfo?.address}
              />
            </div>
          </div>

          <div>
            <Label>Phone number</Label>
            <div className="mt-1.5 flex">
              <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <i className="text-2xl las la-phone-volume"></i>
              </span>
              <Input
                name="phone"
                className="!rounded-l-none"
                defaultValue={profileInfo?.phone}
              />
            </div>
          </div>

          <div className="pt-2">
            <ButtonPrimary type="submit">
              {status === "loading" ? "Processing..." : "Update Profile"}
            </ButtonPrimary>
          </div>

          {status === "succeeded" && (
            <p className="text-green-700 font-medium">Profile Updated Successfully!</p>
          )}
          {status === "failed" && (
            <p className="text-red-700 font-medium">Failed to Update Profile</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default UpdateProfile;


// "use client";

// import Label from "@/components/Label/Label";
// import React, { useEffect, useState, ChangeEvent } from "react";
// import ButtonPrimary from "@/shared/Button/ButtonPrimary";
// import Input from "@/shared/Input/Input";
// import { avatarImgs } from "@/contains/fakeData";
// import Image from "next/image";
// import { getProfileDetails, updateProfile } from "@/api/protected";
// import { useAppSelector } from "@/lib/hooks";

// export interface ProfileInfo {
//   id: number;
//   name: string;
//   phone: string;
//   email: string;
//   propic: string;
//   address: string;
// }

// const UpdateProfile = () => {
//   const authState = useAppSelector((state) => state.auth);
//   const [profileInfo, setProfileInfo] = useState<ProfileInfo>();
//   const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   // Fetch profile details on mount
//   useEffect(() => {
//     async function getProfileInfo() {
//       const res = await getProfileDetails(authState.user?.token || "");
//       if (res.status === true) {
//         setProfileInfo(res.data);
//         setPreviewUrl(res.data.propic); // Set initial preview
//       }
//     }
//     getProfileInfo();
//   }, [authState.user?.token]);

//   // Handle image selection
//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.size > 0) { // Ensure file is valid
//       setSelectedImage(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   // Handle form submission
//   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const formData = new FormData();
//     // Add text fields manually
//     formData.append("name", (event.currentTarget.elements.namedItem("name") as HTMLInputElement).value);
//     formData.append("email", (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value);
//     formData.append("address", (event.currentTarget.elements.namedItem("address") as HTMLInputElement).value);
//     formData.append("phone", (event.currentTarget.elements.namedItem("phone") as HTMLInputElement).value);

//     // Append image if selected
//     if (selectedImage) {
//       formData.append("propic", selectedImage);
//     }

//     const token = authState.user?.token || "";
//     setStatus("loading");

//     try {
//       const response = await updateProfile(token, formData);
//       console.log("response update profile", response);

//       if (response.status === true) {
//         setStatus("succeeded");
//         setProfileInfo(response.data); // Update with server response if provided
//         setSelectedImage(null); // Clear selected image
//         setPreviewUrl(response.data?.propic || previewUrl); // Update preview with new URL if returned
//       } else {
//         setStatus("failed");
//       }
//     } catch (error) {
//       console.error("Update profile error:", error);
//       setStatus("failed");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="w-full">
//       <div className="flex flex-col md:flex-row">
//         <div className="flex-shrink-0 flex items-start">
//           {/* AVATAR */}
//           <div className="relative rounded-full overflow-hidden flex w-32 h-32">
//             <Image
//               src={previewUrl || profileInfo?.propic || avatarImgs[2]}
//               alt="avatar"
//               width={128}
//               height={128}
//               className="w-32 h-32 rounded-full object-cover z-0"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
//               <svg
//                 width="30"
//                 height="30"
//                 viewBox="0 0 30 30"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
//                   stroke="currentColor"
//                   strokeWidth={1.5}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <span className="mt-1 text-xs">Change Image</span>
//             </div>
//             <input
//               type="file"
//               name="propic"
//               accept="image/*"
//               className="absolute inset-0 opacity-0 cursor-pointer"
//               onChange={handleImageChange}
//             />
//           </div>
//         </div>

//         <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
//           <div>
//             <Label>Full name</Label>
//             <Input
//               name="name"
//               className="mt-1.5"
//               defaultValue={profileInfo?.name}
//             />
//           </div>

//           <div>
//             <Label>Email</Label>
//             <div className="mt-1.5 flex">
//               <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
//                 <i className="text-2xl las la-envelope"></i>
//               </span>
//               <Input
//                 name="email"
//                 className="!rounded-l-none"
//                 placeholder="example@email.com"
//                 defaultValue={profileInfo?.email}
//               />
//             </div>
//           </div>

//           <div>
//             <Label>Address</Label>
//             <div className="mt-1.5 flex">
//               <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
//                 <i className="text-2xl las la-map-signs"></i>
//               </span>
//               <Input
//                 name="address"
//                 className="!rounded-l-none"
//                 defaultValue={profileInfo?.address}
//               />
//             </div>
//           </div>

//           <div>
//             <Label>Phone number</Label>
//             <div className="mt-1.5 flex">
//               <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
//                 <i className="text-2xl las la-phone-volume"></i>
//               </span>
//               <Input
//                 name="phone"
//                 className="!rounded-l-none"
//                 defaultValue={profileInfo?.phone}
//               />
//             </div>
//           </div>

//           <div className="pt-2">
//             <ButtonPrimary type="submit">
//               {status === "loading" ? "Processing..." : "Update Profile"}
//             </ButtonPrimary>
//           </div>

//           {status === "succeeded" && (
//             <p className="text-green-700 font-medium">Profile Updated Successfully!</p>
//           )}
//           {status === "failed" && (
//             <p className="text-red-700 font-medium">Failed to Update Profile</p>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default UpdateProfile;