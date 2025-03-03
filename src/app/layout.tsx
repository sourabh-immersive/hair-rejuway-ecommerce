import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "@/styles/custom.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import { StoreProvider } from "./StoreProvider";
import { SessionProvider } from "next-auth/react";
import { RefreshSession } from "./RefreshSession";
import PageTransition from "./PageTransition";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" dir="" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        {/* <PageTransition> */}
          <StoreProvider>
            <SessionProvider>
              <RefreshSession>{children}</RefreshSession>
            </SessionProvider>
          </StoreProvider>
        {/* </PageTransition> */}
      </body>
    </html>
  );
}
