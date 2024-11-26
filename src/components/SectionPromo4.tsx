import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Promo41 from "@/images/promo41.png";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export interface SectionPromo4Props {
  className?: string;
}

const SectionPromo4: FC<SectionPromo4Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionPromo4 promo4 relative flex flex-col lg:flex-row items-center p-6 br-10 ${className}`}
    >
      <div className="relative flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-3/5">
        <h5 className=" text-white">Love it with first click</h5>
        <h2 className="font-semibold text-white text-2xl sm:text-3xl xl:text-4xl xl:text-5xl !leading-[1.2] tracking-tight">
            Brand in your hand her
        </h2>
        <span className="block mt-6 text-white sm:mt-8 text-white-300 dark:text-white-300 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-8">
          <ButtonSecondary
            href="/search"
            className="border border-green-100 dark:border-green-700 text-slay-green-300 dark:text-slay-green-300"
          >
            View More
          </ButtonSecondary>
        </div>
      </div>
      <div className="relative flex-1 max-w-xl lg:max-w-none">
        <NcImage
          alt=""
          containerClassName="block dark:hidden"
          src={Promo41}
          sizes="(max-width: 768px) 100vw, 50vw"
          className=""
        />
      </div>
    </div>
  );
};

export default SectionPromo4;
