"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/routers/types";

const pages: {
  name: string;
  link: Route;
}[] = [
  {
    name: "Account info",
    link: "/account",
  },
  // {
  //   name: "Save lists",
  //   link: "/account-savelists",
  // },
  {
    name: "My order",
    link: "/account-order",
  },
  {
    name: "Change password",
    link: "/account-password",
  },
  {
    name: "Change Billing",
    link: "/account-billing",
  },
];

const Tabs: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
      {pages.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`block py-5 md:py-8 border-b-2 flex-shrink-0 text-sm sm:text-base ${
            pathname === item.link
              ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;