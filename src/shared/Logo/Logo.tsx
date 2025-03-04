import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = '/hair-rejuway-logo.png',
  imgLight = '/hair-rejuway-logo.png',
  className = "flex-shrink-0",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
      prefetch={true}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <Image
          className={`block max-w-20 md:max-w-32 ${
            imgLight ? "dark:hidden" : ""
          }`}
          src={img}
          alt="Logo"
          width={127}
          height={63}
          priority
        />
      ) : (
        "Hair Rejuway"
      )}
      {imgLight && (
        <Image
          className="hidden dark:block"
          src={imgLight}
          width={127}
          height={63}
          alt="Logo-Light"
          priority
        />
      )}
    </Link>
  );
};

export default Logo;