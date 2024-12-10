import React, { FC } from "react";
import SiteHeader from "../SiteHeader";
import CommonClient from "../CommonClient";
import Footer from "@/shared/Footer/Footer";
import Tabs from "./tabs";
import SessionProvider from "./SessionProvider";
import { auth } from "@/auth";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = async ({ children }) => {
  const session = await auth();

  if (!session?.user) return null;
  console.log(session);
  return (
    <>
      <SessionProvider>
        <SiteHeader />
        <div className="nc-AccountCommonLayout container">
          <div className="mt-14 sm:mt-20">
            <div className="max-w-4xl mx-auto">
              <div className="max-w-2xl">
                <h2 className="text-3xl xl:text-4xl font-semibold">Account</h2>
                <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg">
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">
                    {session.user.name}
                  </span>{" "}
                  {session.user.email} · Los Angeles, CA
                  <br />
                  <p>{session.user.apiToken}</p>
                </span>
              </div>
              <hr className="mt-10 border-slate-200 dark:border-slate-700" />

              <Tabs />

              <hr className="border-slate-200 dark:border-slate-700" />
            </div>
          </div>
          <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
            {children}
          </div>
        </div>
        <CommonClient />
        <Footer />
      </SessionProvider>
    </>
  );
};

export default CommonLayout;
