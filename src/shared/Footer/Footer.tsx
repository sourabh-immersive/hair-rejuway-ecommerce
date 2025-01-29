import Logo from "@/shared/Logo/Logo";
import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import Link from "next/link";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Hair Rejuway Journey",
    menus: [
      { href: "/about-us", label: "About Us" },
      { href: "/reviews", label: "Reviews" },
      { href: "/faq", label: "FAQ" },
      { href: "/products", label: "Shop Online" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "/categories/hair-care", label: "Hair Care" },
      { href: "/categories/hair-fall", label: "Hair Fall" },
      { href: "/categories/dandruff", label: "Dandruff" },
      { href: "/categories/curl-care", label: "Curl Care" },
    ],
  },
  {
    id: "2",
    title: "Quick Links",
    menus: [
      { href: "/products", label: "Products" },
      { href: "/about-us", label: "About" },
      { href: "/", label: "Home" },
    ],
  },
  {
    id: "4",
    title: "Legal",
    menus: [
      { href: "/money-back-policy", label: "Money Back Policy" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/return-policy", label: "Return Policy" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-base dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <Link
                key={index}
                className="text-neutral-6000 text-base font-normal dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                target="_blank"
                prefetch={true}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-white border-t">
        <div className="container">
          <div className="py-6 px-0 flex flex-col md:flex-row items-center md:items-start justify-between">
            {/* Left Section */}
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Keep in touch!</h2>
              <p className="text-gray-600">
                Stay updated with special offers, discounts, tips & new product releases.
              </p>
            </div>

            {/* Right Section */}
            <form className="flex items-center w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-72 h-12 px-4 bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <div className="w-2"></div> {/* Spacer between the input and button */}
              <button
                type="submit"
                className="h-12 px-6 bg-gray-600 text-white hover:bg-gray-500 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="nc-Footer relative py-10 lg:pt-20 lg:pb-24 border-t bg-gray-200 border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
    </div>
  );
};

export default Footer;
