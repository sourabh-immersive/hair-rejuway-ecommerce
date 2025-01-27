import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Promo41 from "@/images/promo41.png";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";

export interface PromoBannerProps {
  className?: string;
  image?: string;
}

const PromoBanner: FC<PromoBannerProps> = ({ className = "", image }) => {
  const img = !image ? "/banners/banner1.jpeg" : image;
  return (
    <div
      className={`relative flex flex-col mb-8 lg:flex-row items-center${className}`}
    >
      <div className="relative flex-1 max-w-xl lg:max-w-none">
        <Link href={"/products"} prefetch={true}>
          <Image
            className="rounded-lg h-auto"
            src={img}
            alt={"Promotional Banner"}
            width={1200}
            height={140}
          />
        </Link>
      </div>
    </div>
  );
};

export default PromoBanner;
