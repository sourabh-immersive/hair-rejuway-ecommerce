import React, { FC } from "react";
import delivery from "@/images/delivery.png";
import safepay from "@/images/safepay.png";
import shop from "@/images/shop.png";
import friendlyservices from "@/images/friendlyservices.png";
import twentyfour from "@/images/twentyfour.png";
import Image from "next/image";


export interface SectionFeaturesProps {
  className?: string;
}

const SectionFeatures: FC<SectionFeaturesProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionFeatures features-sec bg-gray-100 relative flex flex-col lg:flex-row items-center justify-center p-6 br-10 ${className}`}
    >
        <div className="container">
            <div className="relative">
                <div className="flex flex-wrap justify-between gap-4 p-4">
                    {/* Column 1 */}
                    <div className="flex items-center w-full sm:w-[calc(20%-1rem)] p-4 bg-gray-100 rounded-md">
                        <div className="relative w-95 h-72 rounded-full bg-saffron mr-2">
                            <Image
                                fill
                                className="w-full h-full object-contain dark:opacity-5 p-3"
                                src={delivery}
                                alt="Delivery"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Free Delivery</h3>
                            <p className="text-xs text-gray-400 text-grey">For all orders over 2000.</p>
                        </div>
                        
                    </div>
                    <div className="flex items-center w-full sm:w-[calc(20%-1rem)] p-4 bg-gray-100 rounded-md">
                        <div className="relative w-72 h-72 rounded-full bg-sky mr-2">
                            <Image
                                fill
                                className="w-full h-full object-contain dark:opacity-5 p-2"
                                src={safepay}
                                alt="Safepay"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Safe Payment</h3>
                            <p className="text-xs text-gray-400 text-grey">100% Secure Pu</p>
                        </div>
                    </div>
                    <div className="flex items-center w-full sm:w-[calc(20%-1rem)] p-4 bg-gray-100 rounded-md">
                        <div className="relative w-95 h-72 rounded-full bg-violet mr-2">
                            <Image
                                fill
                                className="w-full h-full object-contain dark:opacity-5 p-4"
                                src={shop}
                                alt="Shop"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Shop With Confidence</h3>
                            <p className="text-xs text-gray-400 text-grey">If goods have problems</p>
                        </div>
                    </div>
                    <div className="flex items-center w-full sm:w-[calc(20%-1rem)] p-4 bg-gray-100 rounded-md">
                        <div className="relative w-95 h-72 rounded-full bg-redd mr-2">
                            <Image
                                fill
                                className="w-full h-full object-contain dark:opacity-5 p-4"
                                src={twentyfour}
                                alt="Twentyfour"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">24/7 Help Center</h3>
                            <p className="text-xs text-gray-400 text-grey">Dedicated 24/7 support</p>
                        </div>
                    </div>
                    <div className="flex items-center w-full sm:w-[calc(20%-1rem)] p-4 bg-gray-100 rounded-md">
                        <div className="relative w-110 h-72 rounded-full bg-greeen mr-2">
                            <Image
                                fill
                                className="w-full h-full object-contain dark:opacity-5 p-4"
                                src={friendlyservices}
                                alt="Services"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Friendly Services</h3>
                            <p className="text-xs text-gray-400 text-grey">30 day satisfaction guarantee</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SectionFeatures;
