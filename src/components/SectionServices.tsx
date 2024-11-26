import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Promo41 from "@/images/promo41.png";


export interface SectionServicesProps {
  className?: string;
}

const SectionServices: FC<SectionServicesProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionServices features-sec bg-gray-100 relative flex flex-col lg:flex-row items-center justify-center p-6 br-10 ${className}`}
    >
        <div className="relative">
            <div className="flex flex-wrap justify-center gap-6 p-4">
                {/* Column 1 */}
                <div className="flex flex-col items-center w-full sm:w-[calc(33.33%-1rem)] bg-gray-100 p-4">
                    <img 
                    src="/path-to-image1.jpg" 
                    alt="Image 1" 
                    className="w-24 h-24 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-bold text-center">RIGHT HAIR CARE</h3>
                    <p className="text-sm text-black-300 text-center">Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do.</p>
                </div>
                {/* Column 2 */}
                <div className="flex flex-col items-center w-full sm:w-[calc(33.33%-1rem)] bg-gray-100 p-4">
                    <img 
                    src="/path-to-image2.jpg" 
                    alt="Image 2" 
                    className="w-24 h-24 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-bold text-center">ALL HAIR TYPES</h3>
                    <p className="text-sm text-black-300 text-center">Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do.</p>
                </div>
                {/* Column 3 */}
                <div className="flex flex-col items-center w-full sm:w-[calc(33.33%-1rem)] bg-gray-100 p-4">
                    <img 
                    src="/path-to-image3.jpg" 
                    alt="Image 3" 
                    className="w-24 h-24 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-bold text-center">SELECTIVE PRODUCTS</h3>
                    <p className="text-sm text-black-300 text-center">Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do.</p>
                </div>
            </div>

        </div>
    </div>
  );
};

export default SectionServices;
