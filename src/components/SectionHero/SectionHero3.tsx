import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import backgroundLineSvg from "@/images/Moon.svg";
import imageRightPng2 from "@/images/hero-2-right-1.png";
import Image from "next/image";

export interface SectionHero3Props {
  className?: string;
}

const SectionHero3: FC<SectionHero3Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="relative pt-8 lg:pt-0 lg:absolute z-10 inset-x-0 top-[10%] sm:top-[20%]  container">
        <div className="flex flex-col items-start max-w-lg xl:max-w-2xl space-y-5 xl:space-y-4 ">
          <span className="sm:text-md md:text-md font-normal text-gray-400 tracking-widest">
            ELEVATE YOUR BEAUTY ROUTINE
          </span>
          <h2 className="font-semibold text-black text-3xl sm:text-3xl md:text-3xl xl:text-3xl 2xl:text-3xl !leading-[115%] mt-0">
            Hair Rejuway Confidence With Our <br/>
            Exclusive Beauty Collection
          </h2>
          <h2 className="font-normal text-black sm:text-md md:text-md !leading-[115%] leading-4">
            indulge in the luxury of elf-care with curated selection <br/>
            of premium beauty and cosmetic products.n
          </h2>
          <div className="sm:pt-4">
            <ButtonPrimary
              sizeClass="px-6 py-3 lg:px-8 lg:py-2"
              fontSize="text-sm sm:text-base lg:text-lg font-medium"
            >
              Shop now
            </ButtonPrimary>
          </div>
        </div>
      </div>

      <div className="relative z-[1] lg:aspect-w-16 lg:aspect-h-8 2xl:aspect-h-7">
        <div className=" ">
          <div className="mt-5 lg:mt-0 lg:absolute right-0 bottom-0 top-0 w-full max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl ml-auto">
            <Image
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
              className="w-full sm:h-full object-contain object-right-bottom "
              src={imageRightPng2}
              alt=""
              priority
            />
          </div>
        </div>
      </div>

      {/* BG */}
      <div className="absolute inset-0 bg-[#F7F0EA] rounded-2xl overflow-hidden z-0">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute w-full h-full object-contain"
          src={backgroundLineSvg}
          alt="hero"
        />
      </div>
    </div>
  );
};

export default SectionHero3;
