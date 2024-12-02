import React, { FC } from "react";
import services1 from "@/images/services1.png";
import services2 from "@/images/services2.png";
import services3 from "@/images/services3.png";
import Image from "next/image";

export interface SectionServicesProps {
  className?: string;
}

const SectionServices: FC<SectionServicesProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionServices features-sec bg-gray-100 relative flex flex-col lg:flex-row items-center justify-center p-6 br-10 ${className}`}
    >
      <div className="container">
        <div className="relative">
            <div className="flex flex-wrap justify-center gap-6 p-4">
                {/* Column 1 */}
                <div className="flex flex-col items-center sm:w-[calc(33.33%-1rem)] bg-gray-100 p-4 relative">
                  <div className="relative w-80 h-80">
                    <Image
                      fill
                      className="w-full h-full object-contain dark:opacity-5"
                      src={services1}
                      alt="Services"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center mt-5">RIGHT HAIR CARE</h3>
                  <p className="text-sm text-black-300 text-center">Lorem ipsum dolor sit amet, conse <br/>ctetur adipiscing elit, sed do.</p>
                </div>
                {/* Column 2 */}
                <div className="flex flex-col items-center sm:w-[calc(33.33%-1rem)] bg-gray-100 p-4 relative">
                  <div className="relative w-80 h-80">
                    <Image
                      fill
                      className="w-full h-full object-contain dark:opacity-5"
                      src={services2}
                      alt="Services"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center mt-5">ALL HAIR TYPES</h3>
                  <p className="text-sm text-black-300 text-center">Lorem ipsum dolor sit amet, conse ctetur <br/>adipiscing elit, sed do.</p>
                </div>
                {/* Column 3 */}
                <div className="flex flex-col items-center sm:w-[calc(33.33%-1rem)] bg-gray-100 p-4 relative">
                  <div className="relative w-80 h-80">
                    <Image
                      fill
                      className="w-full h-full object-contain dark:opacity-5"
                      src={services3}
                      alt="Services"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center mt-5">SELECTIVE PRODUCTS</h3>
                  <p className="text-sm text-black-300 text-center">Lorem ipsum dolor sit amet, conse ctetur <br/>adipiscing elit, sed do.</p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default SectionServices;
