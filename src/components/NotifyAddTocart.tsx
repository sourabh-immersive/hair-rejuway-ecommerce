import React, { FC } from "react";
import { Transition } from "@/app/headlessui";
import Prices from "@/components/Prices";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Props {
  show: boolean;
  title: string;
  productImage: string | StaticImageData;
  variantActive: number;
  sizeSelected: string;
  quantitySelected: number;
  price: number;
  salePrice: number;
}

const NotifyAddTocart: FC<Props> = ({
  show,
  title,
  productImage,
  variantActive,
  quantitySelected,
  sizeSelected,
  price,
  salePrice,
}) => {
  const renderProductCartOnNotify = () => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 relative flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={productImage}
            alt={title}
            fill
            sizes="100px"
            className="h-full w-full object-contain object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{title}</h3>
                {/* <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {variants ? variants[variantActive].title : `Natural`}
                  </span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{sizeSelected || "XL"}</span>
                </p> */}
              </div>
              <Prices price={price} salePrice={salePrice} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">{`Qty ${quantitySelected}`}</p>

            <div className="flex">
              <Link href={"/cart"}>
                <button
                  type="button"
                  className="font-medium text-primary-6000 dark:text-primary-500 "
                >
                  View cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Transition
      appear
      show={show}
      className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
      enter="transition-all duration-150"
      enterFrom="opacity-0 translate-x-20"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-20"
    >
      <p className="block text-base font-semibold leading-none">
        Added to cart!
      </p>
      <hr className=" border-slate-200 dark:border-slate-700 my-4" />
      {renderProductCartOnNotify()}
    </Transition>
  );
};

export default NotifyAddTocart;
