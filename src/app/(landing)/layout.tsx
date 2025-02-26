import React from "react";
import SiteHeader from "../SiteHeader";
import Footer from "@/shared/Footer/Footer";
import CommonClient from "../CommonClient";

export default function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <div className="publicLayout">
      {/* <SiteHeader /> */}
      {children}
      <CommonClient />
      {/* <Footer /> */}
    </div>
  );
}
