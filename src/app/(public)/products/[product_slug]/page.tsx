"use client";

import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { Product, PRODUCTS } from "@/data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import Policy from "./Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "./ModalViewAllReviews";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import { getProductBySlug } from "@/api/products";
import { usePathname } from "next/navigation";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";

const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

export interface ProductDetailsItemsProps {
  data?: Product;
}

const attributesDataDummy = [
  {
    name: "Test A",
    options: ["value 1", "value 2"],
  },
  {
    name: "Test B",
    options: ["Value B1", "Value B2"],
  },
];

interface Variation {
  attribute_id: number;
  product_qty: string;
  price: string;
  sale_price: string;
  gst_price: string;
  total_price: string;
  attribute: { attribute_title: string; attribute_value: string }[];
}

const ProductDetailPage = ({
  // data,
  params,
}: {
  // data: Product;
  params: { product_slug: string };
}) => {
  const { product_slug } = params;
  const [productData, setProductData] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const ProductDetail = await getProductBySlug(product_slug);
        // console.log(ProductDetail)
        setProductData(ProductDetail.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [product_slug]);

  useEffect(() => {
    // Find matching variation when attributes change
    const matchingVariation = productData?.product_variations.find(
      (variation) => {
        return variation.attribute.every((attr) => {
          const selectedValue = selectedAttributes[attr.attribute_title];
          return selectedValue === attr.attribute_value;
        });
      }
    );

    setSelectedVariation(matchingVariation || null);
  }, [selectedAttributes]);

  const handleAttributeChange = (name: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(selectedAttributes)
  //
  const [variantActive, setVariantActive] = useState(0);
  const [qualitySelected, setQualitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  //
  const notifyAddTocart = () => {
    // toast.custom(
    //   (t) => (
    //     <NotifyAddTocart
    //       productImage={thumbnail}
    //       qualitySelected={qualitySelected}
    //       show={t.visible}
    //       sizeSelected={sizeSelected}
    //       variantActive={variantActive}
    //     />
    //   ),
    //   { position: "top-right", id: "nc-product-notify", duration: 3000 }
    // );
  };

  const renderVariants = () => {
    if (
      productData?.product_variations.length === 1 ||
      productData?.product_variations.length === 0
    ) {
      return null;
    }

    return (
      <div>
        <div className="varDisplay">
          <div>
            {productData?.attributes &&
              productData?.attributes.map((attr) => (
                <div key={attr.name}>
                  <label>{attr.name}:</label>
                  <select
                    value={selectedAttributes[attr.name] || ""}
                    onChange={(e) =>
                      handleAttributeChange(attr.name, e.target.value)
                    }
                  >
                    <option value="">Select {attr.name}</option>
                    {attr.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>

          {/* Display Price and Variation Details */}
          {selectedVariation ? (
            <div>
              <h2>Selected Variation Details</h2>
              <p>Price: {selectedVariation.price}</p>
              <p>Sale Price: {selectedVariation.sale_price}</p>
              <p>Total Price: {selectedVariation.total_price}</p>
              <p>Stock: {selectedVariation.product_qty}</p>
            </div>
          ) : (
            <p>Please select all attributes to see price and details.</p>
          )}
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    const accData = [
      {
        name: "Specializations",
        content: `${productData?.specializations}`,
      },
    ];

    let lowestPrice: number | string;
    let largestPrice: number | string;
    let price: number | string;

    const getPrice = () => {
      if (productData?.product_variations.length === 1) {
        const singlePrice = parseFloat(
          productData?.product_variations[0].sale_price
        );
        price = singlePrice;
        return price;
      } else if (
        productData?.product_variations &&
        productData?.product_variations.length > 1
      ) {
        const salePrices = productData?.product_variations.map((item) =>
          parseFloat(item.sale_price)
        );
        lowestPrice = Math.min(...salePrices);
        largestPrice = Math.max(...salePrices);

        return productData?.product_variations.length === 1
          ? price
          : `${lowestPrice} - ${largestPrice}`;
      }
    };

    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {productData?.title}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={getPrice()}
            />

            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    142 reviews
                  </span>
                </div>
              </a>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{"New"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        <div className="">{renderVariants()}</div>
        {/* <div className="">{renderSizeList()}</div> */}

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        {/* {accData && <AccordionInfo data={accData} />} */}

        {/* ---------- Specializations ----------  */}
        <h3 className="text-xl font-semibold">Specializations</h3>
        {productData?.specializations && (
          productData.specializations.map( (s, i) => (
            <p key={i}><b>{i+1}. {s.title}</b><br />{s.value}</p>
          ))
        )}
        {/* ---------- Ingredient ----------  */}
        <h3 className="text-xl font-semibold">Ingredient</h3>
        {productData?.ingredient && (
          productData.ingredient.map( (s, i) => (
            <p key={i}><b>{i+1}. {s.title}</b><br />{s.image}</p>
          ))
        )}

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    if (!productData?.details || typeof productData.details !== "string") {
      return null; // Render nothing if details is undefined, null, or not a string
    }
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          {/* Use dangerouslySetInnerHTML to render raw HTML */}
          <div dangerouslySetInnerHTML={{ __html: productData.details }} />
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage `}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16 relative">
                {productData?.feature_image && (
                  <Image
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    // src={productData?.feature_image}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${productData?.feature_image}`}
                    className="w-full rounded-2xl object-cover"
                    alt="product detail 1"
                  />
                )}
              </div>
              {/* {renderStatus()} */}
              {/* META FAVORITES */}
              {/* <LikeButton className="absolute right-3 top-3 " /> */}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8 hidden">
              {[LIST_IMAGES_DEMO[1], LIST_IMAGES_DEMO[2]].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16 relative"
                  >
                    <Image
                      sizes="(max-width: 640px) 100vw, 33vw"
                      fill
                      src={item}
                      className="w-full rounded-2xl object-cover"
                      alt="product detail 1"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {renderDetailSection()}

          {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

          {/* {renderReviews()} */}

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* OTHER SECTION */}
          <SectionGridFeatureItems />
          {/* <SectionSliderProductCard
            heading="Related Products"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
          /> */}

          {/* SECTION */}
          {/* <div className="pb-20 xl:pb-28 lg:pt-14">
            <SectionPromo2 />
          </div> */}
        </div>
      </main>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
