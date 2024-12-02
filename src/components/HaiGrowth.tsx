import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Hairgrowth from "@/images/hairgrowth.png";


export interface HairGrowthProps {
  className?: string;
}

const HairGrowth: FC<HairGrowthProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-HairGrowth features-sec bg-gray-100 relative flex flex-col lg:flex-row items-center justify-center  br-10 ${className}`}
    >
        <div className="relative">
            <div className="flex flex-wrap justify-between gap-4 p-4">
                {/* Column 1 */}
                <div className="flex items-center w-full sm:w-[calc(20%-1rem)] p-4 bg-gray-100 rounded-md">
                    <img 
                    src="/path-to-image1.jpg" 
                    alt="Image 1" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                        <h3 className="text-sm font-semibold">Free Delivery</h3>
                        <p className="text-sm text-gray-400 text-grey">For all orders over 2000.</p>
                    </div>
                </div>
                {/* Repeat the structure for other columns */}
                <div className="flex items-center w-full sm:w-[calc(20%-1rem)] p-4 bg-gray-100 rounded-md">
                    <img 
                    src="/path-to-image2.jpg" 
                    alt="Image 2" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                        <h3 className="text-sm font-semibold">Safe Payment</h3>
                        <p className="text-sm text-gray-400 text-grey">100% Secure Pu</p>
                    </div>
                </div>
                <div className="flex items-center w-full sm:w-[calc(20%-1rem)] p-4 bg-gray-100 rounded-md">
                    <img 
                    src="/path-to-image3.jpg" 
                    alt="Image 3" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                        <h3 className="text-sm font-semibold">Shop With Confidence</h3>
                        <p className="text-sm text-gray-400 text-grey">If goods have problems</p>
                    </div>
                </div>
                <div className="flex items-center w-full sm:w-[calc(20%-1rem)] p-4 bg-gray-100 rounded-md">
                    <img 
                    src="/path-to-image4.jpg" 
                    alt="Image 4" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                        <h3 className="text-sm font-semibold">24/7 Help Center</h3>
                        <p className="text-sm text-gray-400 text-grey">Dedicated 24/7 support</p>
                    </div>
                </div>
                <div className="flex items-center w-full sm:w-[calc(20%-1rem)] p-4 bg-gray-100 rounded-md">
                    <img 
                    src="/path-to-image5.jpg" 
                    alt="Image 5" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                        <h3 className="text-sm font-semibold">Friendly Services</h3>
                        <p className="text-sm text-gray-400 text-grey">30 day satisfaction guarantee</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HairGrowth;
