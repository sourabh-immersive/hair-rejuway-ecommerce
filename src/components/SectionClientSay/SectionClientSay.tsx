"use client";

// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import Heading from "@/components/Heading/Heading";
import React, { FC, useId, useRef, useState } from "react";
import { useEffect } from "react";
import clientSayMain from "@/images/clientSayMain.png";
import clientSay1 from "@/images/clientSay1.png";
import clientSay2 from "@/images/clientSay2.png";
import clientSay3 from "@/images/clientSay3.png";
import clientSay4 from "@/images/clientSay4.png";
import clientSay5 from "@/images/clientSay5.png";
import clientSay6 from "@/images/clientSay6.png";
import quotationImg from "@/images/quotation.png";
import quotationImg2 from "@/images/quotation2.png";
import GoogleSvg from "@/images/google-svg.png";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { DEMO_DATA } from "./data";

export interface SectionClientSayProps {
  className?: string;
}

const SectionClientSay: FC<SectionClientSayProps> = ({ className = "" }) => {
  const sliderRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      type: 'carousel',
      perView: 5, // Number of fully visible slides
      focusAt: 'center', // Center the active slide
      peek: 100, // Show 100px of adjacent slides on both sides
      gap: 10, // Space between slides
      autoplay: 3000, // Autoplay every 3 seconds
      animationDuration: 800, // Animation speed in milliseconds
      breakpoints: {
        1024: { perView: 2, peek: 50 },
        768: { perView: 1, peek: 50 },
      },
    };

    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  const renderBg = () => {
    return (
      {/*<div className="hidden md:block">
        <Image
          sizes="100px"
          className="absolute top-9 -left-20"
          src={clientSay1}
          alt=""
        />
        <Image
          sizes="100px"
          className="absolute bottom-[100px] right-full mr-40"
          src={clientSay2}
          alt=""
        />
        <Image
          sizes="100px"
          className="absolute top-full left-[140px]"
          src={clientSay3}
          alt=""
        />
        <Image
          sizes="100px"
          className="absolute -bottom-10 right-[140px]"
          src={clientSay4}
          alt=""
        />
        <Image
          sizes="100px"
          className="absolute left-full ml-32 bottom-[80px]"
          src={clientSay5}
          alt=""
        />
        <Image
          sizes="100px"
          className="absolute -right-10 top-10 "
          src={clientSay6}
          alt=""
        />
      </div>*/}
    );
  };

  return (
    <div
      className={`nc-SectionClientSay clientssay relative flow-root ${className} `}
      data-nc-id="SectionClientSay"
    >
      <div className="text-md text-blue-500 mb-2 text-center">Clients Reactions</div>
      <Heading isCenter>
        What Our People Say
      </Heading>
      <div className="relative md:mb-16 max-w-8xl mx-auto">
        {/*{renderBg()}*/}

        <div
          ref={sliderRef}
          className={`mt-12 lg:mt-16 relative ${isShow ? "" : "invisible"}`}
        >
          <div className="glide__track " data-glide-el="track">
            <ul className="glide__slides">
              {DEMO_DATA.map((item) => (
                <li
                  key={item.id}
                  className="glide__slide flex flex-col mr-2 bg-blue-600 px-4 py-5 rounded-3xl"
                >
                  <div className="flex justify-between items-center mb-0.5 relative">
                    {/* Rating Section */}
                    <div className="flex items-center space-x-0.5 mt-3.5 text-white">
                      <StarIcon className="w-6 h-6" />
                      <StarIcon className="w-6 h-6" />
                      <StarIcon className="w-6 h-6" />
                      <StarIcon className="w-6 h-6" />
                      <StarIcon className="w-6 h-6" />
                    </div>

                    {/* Google Image Section */}
                    <div className="mx-auto relative">
                      <Image
                        sizes="(max-width: 768px) 100vw, 50vw"
                        fill
                        className="w-16 h-auto object-contain" 
                        src={GoogleSvg}
                        alt="Google"
                        priority
                      />
                    </div>
                  </div>

                  <span className="block text-sm text-left text-white mt-3 mb-5">{item.content}</span>
                  <div className="flex items-center mt-5">
                    <div className="initials-wrap bg-customBlue rounded-full px-3 py-1 text-white mr-2">
                      E
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-semibold text-white">
                        {item.clientName}
                      </span>
                      <h6 className="font-normal text-xs text-white">Modal</h6>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="mt-10 glide__bullets flex items-center justify-center"
            data-glide-el="controls[nav]"
          >
            {DEMO_DATA.map((item, index) => (
              <button
                key={item.id}
                className="glide__bullet w-2 h-2 rounded-full bg-neutral-300 mx-1 focus:outline-none"
                data-glide-dir={`=${index}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
