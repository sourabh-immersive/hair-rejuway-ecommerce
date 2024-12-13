"use client";

import React, { FC, useState } from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Product, PRODUCTS } from "@/data/data";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import { Transition } from "@/app/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import { useAppDispatch } from "@/lib/hooks";
import { addItemToCart } from "@/lib/features/cart/cartSlice";

export interface ProductCardProps {
  className?: string;
  data: Product;
  isLiked?: boolean;
}

interface CartProduct {
  id: string;
  name: string;
  price: number;
}

interface ProductListProps {
  products: CartProduct[];
}

const ProductCard: FC<ProductCardProps> = ({ className, data, isLiked }) => {
  const {
    title,
    description,
    product_variations,
    slug,
    sizes,
    variants,
    variantType,
    status,
    feature_image,
    rating,
    id,
    numberOfReviews,
  } = data;

  // const {
  //   attribute_id,
  //   product_qty,
  //   price,
  //   sale_price,
  //   gst_price,
  //   total_price,
  //   // packing_id: number;
  //   // packing_size: string;
  //   attribute,
  // } = product_variations;

  const dispatch = useAppDispatch();
  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const [modalContent, setModalContent] = useState<Product | null>(null);
  const router = useRouter();

  let lowestPrice: number | string;
  let largestPrice: number | string;
  let price: number;

  const productType = product_variations.length === 1 ? "simple" : "variable";

  const getPrice = () => {
    if (product_variations.length === 1) {
      const singlePrice = (product_variations[0].sale_price);
      price = singlePrice;
      return price;
    } else if (product_variations.length > 1) {
      const salePrices = product_variations.map((item) =>
        (item.sale_price)
      );
      lowestPrice = Math.min(...salePrices);
      largestPrice = Math.max(...salePrices);

      return product_variations.length === 1
        ? price
        : `${lowestPrice} - ${largestPrice}`;
    }
  };

  const wishlistData = {
    id: String(id),
    name: title,
    thumbnail: feature_image,
    price: 55000,
  };

  // console.log('fdfs', typeof(getPrice()))

  const notifyAddTocart = ({ attribute_id }: { attribute_id?: string }) => {
    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
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
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ attribute_id })}
        </Transition>
      ),
      {
        position: "top-right",
        id: String(id) || "product-detail",
        duration: 3000,
      }
    );

    const cartItem = {
      id: String(id),
      name: title,
      thumbnail: feature_image ? `${feature_image}` : null,
      price: (product_variations[0].price),
      productType: productType,
      salePrice: (product_variations[0].sale_price),
      quantity: 1,
    };

    dispatch(addItemToCart(cartItem));
  };

  const renderProductCartOnNotify = ({
    attribute_id,
  }: {
    attribute_id?: string;
  }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={feature_image} 
            alt={title}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {variants ? variants[variantActive].title : `Natural`}
                  </span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{attribute_id || "-"}</span>
                </p>
              </div>
              <Prices
                price={""}
                salePrice={""}
                priceRange={getPrice()}
                className="mt-0.5"
              />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/cart");
                }}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getBorderClass = (Bgclass = "") => {
    if (Bgclass.includes("red")) {
      return "border-red-500";
    }
    if (Bgclass.includes("violet")) {
      return "border-violet-500";
    }
    if (Bgclass.includes("orange")) {
      return "border-orange-500";
    }
    if (Bgclass.includes("green")) {
      return "border-green-500";
    }
    if (Bgclass.includes("blue")) {
      return "border-blue-500";
    }
    if (Bgclass.includes("sky")) {
      return "border-sky-500";
    }
    if (Bgclass.includes("yellow")) {
      return "border-yellow-500";
    }
    return "border-transparent";
  };

  const renderVariants = () => {
    if (!variants || !variants.length || !variantType) {
      return null;
    }

    if (variantType === "color") {
      return (
        <div className="flex space-x-1">
          {variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
                variantActive === index
                  ? getBorderClass(variant.color)
                  : "border-transparent"
              }`}
              title={variant.title}
            >
              <div
                className={`absolute inset-0.5 rounded-full z-0 ${variant.color}`}
              ></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex ">
        {variants.map((variant, index) => (
          <div
            key={index}
            onClick={() => setVariantActive(index)}
            className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${
              variantActive === index
                ? "border-black dark:border-slate-300"
                : "border-transparent"
            }`}
            title={variant.title}
          >
            <div
              className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
              style={{
                backgroundImage: `url(${
                  // @ts-ignore
                  typeof variant.thumbnail?.src === "string"
                    ? // @ts-ignore
                      variant.thumbnail?.src
                    : typeof variant.thumbnail === "string"
                    ? variant.thumbnail
                    : ""
                })`,
              }}
            ></div>
          </div>
        ))}
      </div>
    );
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => notifyAddTocart({ attribute_id: "XL" })}
        >
          <BagIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="ms-1">Add to bag</span>
        </ButtonPrimary>
        <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => {
            setModalContent(data);
            setShowModalQuickView(true);
          }}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };

  const renderGroupVariationButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <Link href={`/products/${slug}`} className="">
          <ButtonPrimary
            className="shadow-lg"
            fontSize="text-xs"
            sizeClass="py-2 px-4"
            // onClick={() => notifyAddTocart({ attribute_id: "XL" })}
          >
            <BagIcon className="w-3.5 h-3.5 mb-0.5" />
            <span className="ms-1">View Product</span>
          </ButtonPrimary>
        </Link>
        <ButtonSecondary
          className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => {
            setModalContent(data);
            setShowModalQuickView(true);
          }}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ms-1">Quick view</span>
        </ButtonSecondary>
      </div>
    );
  };

  // const renderSizeList = () => {
  //   if (product_variations.length === 1) {
  //     return null;
  //   }

  //   return (
  //     <div className="absolute bottom-0 inset-x-1 space-x-1.5 rtl:space-x-reverse flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
  //       {product_variations.map((item, index) => {
  //         console.log('zzzzz',item);
  //         const { attribute } = item;
  //         return (
  //           <div
  //             key={index}
  //             className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
  //             onClick={() => notifyAddTocart({ attribute })}
  //           >
  //             {item.attribute_id}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent pb-10 ${className}`}
      >
        <Link href={`/products/${slug}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={`/products/${slug}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={`${feature_image}`}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
          <ProductStatus status={status} />
          <LikeButton
            liked={isLiked}
            data={wishlistData}
            className="absolute top-3 end-3 z-10"
          />
          {product_variations.length === 1
            ? renderGroupButtons()
            : renderGroupVariationButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {renderVariants()}
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {title}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
              {description}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices
              price={""}
              salePrice={""}
              priceRange={getPrice()}
              className="mt-0.5"
            />
            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {rating || ""} ({numberOfReviews || 0} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        content={modalContent}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
