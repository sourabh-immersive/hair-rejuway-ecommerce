import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Hairgrowth from "@/images/hairgrowth.png";


export interface SectionHairgrowthProps {
  className?: string;
}

const SectionHairgrowth: FC<SectionHairgrowthProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHairgrowth relative flex flex-col lg:flex-row items-center justify-center p-6 br-10 ${className}`}
    >
        <div className="relative">
            <NcImage
            alt=""
            containerClassName="block dark:hidden"
            src={Hairgrowth}
            sizes="(max-width: 768px) 100vw, 50vw"
            className=""
            />
        </div>
    </div>
  );
};

export default SectionHairgrowth;
