"use client";

import React, { FC, useState } from "react";
import backgroundLineSvg from "@/images/Moon.svg";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Next from "@/shared/NextPrev/Next";
import Prev from "@/shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";
import Image from "next/image";
import { HERO2_DEMO_DATA as DATA } from "./data";

export interface SectionHero2Props {
  className?: string;
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 5500 : null
  );

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= DATA.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= DATA.length - 1) {
        return 0;
      }
      return state + 1;
    });
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return DATA.length - 1;
      }
      return state - 1;
    });
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true);
    }, 1000);
  };

  const renderItem = (index: number) => {
    const isActive = indexActive === index;
    const item = DATA[index];
    if (!isActive) {
      return null;
    }
    return (
      <div
        className={`nc-SectionHero2Item mt-4 container nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden ${className}`}
        key={index}
      >
        <div className="absolute bottom-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-20 flex justify-center hidden">
          {DATA.map((_, index) => {
            const isActive = indexActive === index;
            return (
              <div
                key={index}
                onClick={() => {
                  setIndexActive(index);
                  handleAfterClick();
                }}
                className={`relative px-1 py-1.5 cursor-pointer`}
              >
                <div
                  className={`relative w-20 h-1 shadow-sm rounded-md bg-white`}
                >
                  {isActive && (
                    <div
                      className={`nc-SectionHero2Item__dot absolute inset-0 bg-slate-900 rounded-md ${
                        isActive ? " " : " "
                      }`}
                    ></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Prev
          className="absolute start-1 sm:start-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
          btnClassName="w-12 h-12 bg-white hover:border-slate-400 dark:hover:border-slate-400"
          svgSize="w-6 h-6"
          onClickPrev={handleClickPrev}
        />
        <Next
          className="absolute end-1 sm:end-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
          btnClassName="w-12 h-12 bg-white hover:border-slate-400 dark:hover:border-slate-400"
          svgSize="w-6 h-6"
          onClickNext={handleClickNext}
        />

        {/* BG */}
        <div className="absolute inset-0 bg-[#ffffff]">
          {/* <Image
            fill
            sizes="(max-width: 768px) 90vw, 50vw"
            className="absolute w-full h-full object-contain"
            src={item.image}
            alt="hero"
          /> */}
        </div>

        <div className="relative ">
          
          <div
            className={`relative z-[1] min-h-[450px] w-full space-y-8 sm:space-y-14`}
          >
            <Image
            fill
            sizes="(max-width: 768px) 90vw, 50vw"
            className=""
            src={item.image}
            alt="hero"
          />
          </div>
        </div>
      </div>
    );
  };

  return <>{DATA.map((_, index) => renderItem(index))}</>;
};

export default SectionHero2;
