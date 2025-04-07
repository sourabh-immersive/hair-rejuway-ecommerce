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
import Image, { StaticImageData } from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import { getProductBySlug } from "@/api/products";
import { usePathname } from "next/navigation";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addItemToCart } from "@/lib/features/cart/cartSlice";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import ReviewsSlider from "@/components/Reviews/reviews";
import {
  addItemLocally,
  addToCartAsync2,
  CartItem,
  CartItemVariation,
  LocalCartItem,
} from "@/lib/features/cart/cartBSlice";

export interface ProductDetailsItemsProps {
  data?: Product;
}

interface Variation {
  variation_id: number;
  product_qty: string;
  price: number;
  sale_price: number;
  gst_price: number;
  total_price: number;
  attribute: {
    attribute_id?: string;
    attribute_title: string;
    attribute_value: string;
  }[];
}

const ProductDetail = ({ data }: { data: Product }) => {
  const productData = data;
  const authStateData = useAppSelector((state) => state.auth);

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  );
  const dispatch = useAppDispatch();
  const productType =
    productData?.product_variations?.length === 1 ? "simple" : "variable";

  const [selectedImage, setSelectedImage] = useState<string | StaticImageData>(
    ""
  );

  console.log("selectedVariation", selectedVariation);

  useEffect(() => {
    if (productData?.feature_image) {
      setSelectedImage(productData?.feature_image);
    }
  }, [productData]);

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
  const [quantitySelected, setQuantitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  // console.log(selectedAttributes);
  //
  const notifyAddTocart = () => {
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={
            productData?.feature_image ? productData.feature_image : ""
          }
          quantitySelected={quantitySelected}
          show={t.visible}
          title={productData?.title ? productData.title : ""}
          sizeSelected={"f"}
          variantActive={variantActive}
          price={
            productType === "simple"
              ? productData?.product_variations[0].price ?? 0
              : selectedVariation?.price ?? 0
          }
          salePrice={
            productType === "simple"
              ? productData?.product_variations[0].sale_price ?? 0
              : selectedVariation?.sale_price ?? 0
          }
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );

    // const attributesArray = Object.entries(selectedAttributes).map(
    //   ([key, value]) => ({
    //     name: key,
    //     value: value,
    //   })
    // );

    // console.log('attributesArray', attributesArray)

    // const cartItem = {
    //   id: String(productData?.id),
    //   name: productData?.title || "Product",
    //   thumbnail: productData?.feature_image || null,
    //   price:
    //     productType === "simple"
    //       ? productData?.product_variations?.[0]?.price || 0
    //       : selectedVariation?.price ?? 0,
    //   salePrice:
    //     productType === "simple"
    //       ? productData?.product_variations?.[0]?.sale_price !== undefined &&
    //         productData?.product_variations?.[0]?.sale_price > 0
    //         ? productData?.product_variations?.[0]?.sale_price
    //         : productData?.product_variations?.[0]?.price ?? 0
    //       : selectedVariation?.sale_price !== undefined &&
    //         selectedVariation?.sale_price > 0
    //       ? selectedVariation?.sale_price
    //       : selectedVariation?.price ?? 0,
    //   attributesData: productType === "simple" ? [] : attributesArray,
    //   quantity: quantitySelected,
    //   productType,
    // };

    // dispatch(addItemToCart(cartItem));

    const attributesArray =
      selectedVariation?.attribute?.map((attr) => ({
        attribute_id: attr.attribute_id,
        attribute_title: attr.attribute_title,
        attribute_value: attr.attribute_value,
      })) || [];

    console.log("attributesArray", attributesArray);

    // const cartItem = {
    //   id: String(productData?.id),
    //   name: productData?.title || "Product",
    //   thumbnail: productData?.feature_image || null,
    //   price:
    //     productType === "simple"
    //       ? productData?.product_variations?.[0]?.price || 0
    //       : selectedVariation?.price ?? 0,
    //   salePrice:
    //     productType === "simple"
    //       ? productData?.product_variations?.[0]?.sale_price !== undefined &&
    //         productData?.product_variations?.[0]?.sale_price > 0
    //         ? productData?.product_variations?.[0]?.sale_price
    //         : productData?.product_variations?.[0]?.price ?? 0
    //       : selectedVariation?.sale_price !== undefined &&
    //         selectedVariation?.sale_price > 0
    //       ? selectedVariation?.sale_price
    //       : selectedVariation?.price ?? 0,
    //   attributesData: productType === "simple" ? [] : attributesArray,
    //   quantity: quantitySelected,
    //   productType,
    // };

    // dispatch(addItemToCart(cartItem));

    // // Need to call add to cart api only when user is logged in
    // if (authStateData.status === "authenticated") {
    //   // Call add to cart api
    //   const cartItemToAdd = {
    //     product_id: String(productData?.id),
    //     product_qty: quantitySelected,
    //     variation: attributesArray
    //   };

    //   console.log('for api call', cartItemToAdd)
    // }

    // New add to cart flow started

    const resultAttributes = attributesArray.map((attribute) => ({
      attribute_id: attribute.attribute_id || "",
      attribute_title: attribute.attribute_title,
      attribute_value: attribute.attribute_value,
    }));


    // Simple product attribute pass
    const simpleProductAttributes = [
      {
        attribute_id: String(productData.product_variations[0].attribute[0].attribute_id),
        attribute_title:
          productData.product_variations[0].attribute[0].attribute_title,
        attribute_value:
          productData.product_variations[0].attribute[0].attribute_value,
      },
    ]

    const cartData: CartItem[] = [
      {
        product_id: String(productData?.id),
        product_qty: String(quantitySelected),
        variation: productType === "simple" ? simpleProductAttributes : resultAttributes,
      },
    ];

    const cartLocalData: LocalCartItem = {
      product_id: String(productData?.id),
      product_qty: String(1),
      variation: productType === "simple" ? simpleProductAttributes : resultAttributes,
      price: String(
        productType === "simple"
          ? productData?.product_variations?.[0]?.sale_price !== undefined &&
            productData?.product_variations?.[0]?.sale_price > 0
            ? productData?.product_variations?.[0]?.sale_price
            : productData?.product_variations?.[0]?.price ?? 0
          : selectedVariation?.sale_price !== undefined &&
            selectedVariation?.sale_price > 0
          ? selectedVariation?.sale_price
          : selectedVariation?.price ?? 0
      ),
      prices: {
        regular_price:
          productType === "simple"
            ? productData?.product_variations?.[0]?.price || 0
            : selectedVariation?.price ?? 0,
        sale_price:
          productType === "simple"
            ? productData?.product_variations?.[0]?.sale_price !== undefined &&
              productData?.product_variations?.[0]?.sale_price > 0
              ? productData?.product_variations?.[0]?.sale_price
              : productData?.product_variations?.[0]?.price ?? 0
            : selectedVariation?.sale_price !== undefined &&
              selectedVariation?.sale_price > 0
            ? selectedVariation?.sale_price
            : selectedVariation?.price ?? 0,
      },
      name: productData?.title || "Product",
      product_image: productData?.feature_image,
      key: Math.random(),
      quantity: quantitySelected,
    };

    if (authStateData.status === "authenticated") {
      console.log("cartData when authenticated", cartData);
      dispatch(addToCartAsync2(cartData));
    } else {
      console.log("cartData when not authenticated", cartLocalData);
      dispatch(addItemLocally(cartLocalData));
    }
  };

  const renderVariants = () => {
    if (
      (productData?.product_variations &&
        productData?.product_variations.length === 1) ||
      productData?.product_variations.length === 0
    ) {
      return null;
    }

    return (
      <div>
        <div className="newVarDesign">
          <div>
            {productData?.attributes &&
              productData?.attributes.map((attr) => (
                <div key={attr.name} className="mb-6">
                  <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    {attr.name}:{attr.id}
                  </h3>
                  <ul className="flex items-center space-x-3">
                    {attr.options.map((option) => (
                      <li key={option}>
                        <input
                          type="radio"
                          id={`${attr.name}-${option}`}
                          name={attr.name}
                          value={option}
                          className="hidden peer"
                          checked={selectedAttributes[attr.name] === option}
                          onChange={() =>
                            handleAttributeChange(attr.name, option)
                          }
                          required
                        />
                        <label
                          htmlFor={`${attr.name}-${option}`}
                          className="inline-flex items-center justify-between p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer 
                  peer-checked:border-blue-600 peer-checked:text-blue-600 
                  hover:text-gray-600 hover:bg-gray-100 
                  dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700 
                  dark:hover:bg-gray-700 dark:hover:text-gray-300 
                  dark:peer-checked:text-blue-500"
                        >
                          <div className="block">
                            <div className="w-full text-base font-semibold">
                              {option}
                            </div>
                          </div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
        <div className="varDisplay">
          <div>
            {/* {productData?.attributes &&
              productData?.attributes.map((attr) => (
                <div
                  key={attr.name}
                  className="flex justify-between items-center"
                >
                  <label>{attr.name}:</label>
                  <select
                    className="min-w-60 p-2"
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
              ))} */}
          </div>

          {/* Display Price and Variation Details */}
          {/* {selectedVariation ? (
            <div>
              <h2>Selected Variation Details</h2>
              <p>Price: {selectedVariation.price}</p>
              <p>Sale Price: {selectedVariation.sale_price}</p>
              <p>Total Price: {selectedVariation.total_price}</p>
              <p>Stock: {selectedVariation.product_qty}</p>
            </div>
          ) : (
            <p className="text-red-600 text-base font-medium">Item is not available.</p>
          )} */}
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

    // const getPrice = () => {
    //   if (productData?.product_variations.length === 1) {
    //     const singlePrice = productData?.product_variations[0].sale_price;
    //     price = singlePrice;
    //     return price;
    //   } else if (
    //     productData?.product_variations &&
    //     productData?.product_variations.length > 1
    //   ) {
    //     const salePrices = productData?.product_variations.map(
    //       (item) => item.sale_price === 0 ? item.price : item.sale_price
    //     );
    //     lowestPrice = Math.min(...salePrices);
    //     largestPrice = Math.max(...salePrices);

    //     return productData?.product_variations.length === 1
    //       ? price
    //       : `${lowestPrice} - ${largestPrice}`;
    //   }
    // };

    const getPrice = (): string | number | undefined => {
      if (
        !productData?.product_variations ||
        productData?.product_variations.length === 0
      )
        return undefined;

      if (productData?.product_variations.length === 1) {
        const singlePrice =
          productData?.product_variations[0].sale_price ||
          productData?.product_variations[0].price;
        return singlePrice;
      }

      // For multiple variations
      const salePrices = productData?.product_variations.map((item) =>
        Number(item.sale_price) > 0
          ? Number(item.sale_price)
          : Number(item.price)
      );

      const lowestPrice = Math.min(...salePrices);
      const largestPrice = Math.max(...salePrices);

      return `${lowestPrice} - ${largestPrice}`;
    };

    const isDisabled = productType === "variable" && !selectedVariation;
    const buttonClass = `flex-1 flex-shrink-0 ${
      isDisabled ? "opacity-80 cursor-not-allowed" : ""
    }`;
    const handleClick = !isDisabled ? notifyAddTocart : undefined;

    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {productData?.title}
          </h2>
          <p className="text-xl font-medium py-4">
            {productData?.short_description}
          </p>

          {/* ---------- Ingredient ----------  */}
          {productData?.ingredient && (
            <>
              {productData.ingredient.length !== 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 overflow-x-auto gap-3 relative">
                    {productData.ingredient.map((s, i) => (
                      <>
                        <div
                          key={i}
                          className={`flex flex-col items-center p-5 pb-0 rounded-2xl dark:bg-opacity-90`}
                        >
                          <Image
                            src={s.image}
                            width={60}
                            height={60}
                            alt={s.title}
                          />
                          <div className="mt-2.5">
                            <p className="text-xs text-center font-semibold text-slate-900">
                              {s.title}
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          )}

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {productType === "simple" ? (
              <Prices
                contentClass="py-1 px-2 md:py-1.5 md:px-3 text-3xl font-semibold"
                price={productData?.product_variations[0].price}
                salePrice={productData?.product_variations[0].sale_price}
              />
            ) : !selectedVariation?.price && !selectedVariation?.sale_price ? (
              <Prices
                contentClass="py-1 px-2 md:py-1.5 md:px-3 text-3xl font-semibold"
                priceRange={getPrice()}
              />
            ) : (
              <Prices
                contentClass="py-1 px-2 md:py-1.5 md:px-3 text-3xl font-semibold"
                price={selectedVariation?.price && selectedVariation.price}
                salePrice={
                  selectedVariation?.sale_price && selectedVariation.sale_price
                }
              />
            )}

            {/* <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={selectedVariation?.price && selectedVariation.price}
              salePrice={selectedVariation?.sale_price && selectedVariation.sale_price}
            /> */}

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
                <span className="ml-1 leading-none font-medium">
                  {productData?.category}
                </span>
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
              defaultValue={quantitySelected}
              onChange={setQuantitySelected}
            />
          </div>
          <ButtonPrimary
            className={buttonClass}
            onClick={handleClick}
            disabled={isDisabled}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* {accData && <AccordionInfo data={accData} />} */}

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    if (!productData?.details || typeof productData.details !== "string") {
      return null;
    }
    return (
      <div className="container py-12">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="dark:prose-invert mt-7">
          {/* Use dangerouslySetInnerHTML to render raw HTML */}
          <div dangerouslySetInnerHTML={{ __html: productData.details }} />
        </div>
      </div>
    );
  };

  const renderInfoSection = () => {
    // if (!productData?.details || typeof productData.details !== "string") {
    //   return null; // Render nothing if details is undefined, null, or not a string
    // }
    return (
      <div className="">
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          {/* <div dangerouslySetInnerHTML={{ __html: productData.details }} /> */}
          <AccordionInfo />
        </div>
      </div>
    );
  };

  const renderBenefitsSection = () => {
    if (!productData?.benefits) {
      return null;
    }
    const { title, description, image, faqs } = productData?.benefits;
    return (
      <div className="container">
        <div className="py-12">
          <div className="lg:flex">
            <div className="w-full lg:w-[50%] ">
              <Image
                className="rounded-2xl"
                src={image}
                alt={title}
                height={400}
                width={600}
              />
            </div>
            <div className="w-full lg:w-[50%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              <h3 className="text-2xl font-semibold mb-5">{title}</h3>
              <p className="text-base font-normal mb-10">{description}</p>
              <AccordionInfo data={faqs} />
            </div>
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: productData.details }} /> */}
          {/* <AccordionInfo /> */}
        </div>
      </div>
    );
  };

  const renderHowToUseSection = () => {
    if (!productData?.how_to_use) {
      return null;
    }
    const { title, description, image, faqs } = productData?.how_to_use;
    return (
      <div className="bg-[#f4f8fb]">
        <div className="py-12 container">
          <div className="lg:flex">
            <div className="w-full lg:w-[50%] ">
              <h3 className="text-2xl font-semibold mb-5">{title}</h3>
              <p className="text-base font-normal mb-10">{description}</p>
              <AccordionInfo data={faqs} />
            </div>
            <div className="w-full lg:w-[50%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              <Image
                className="rounded-2xl"
                src={image}
                alt={title}
                height={400}
                width={600}
              />
            </div>
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: productData.details }} /> */}
          {/* <AccordionInfo /> */}
        </div>
      </div>
    );
  };

  const renderIngredientsSection = () => {
    if (!productData?.ingredients) {
      return null;
    }
    const { title, description, image, faqs } = productData?.ingredients;
    return (
      <div className="">
        <div className="py-12 container">
          <div className="lg:flex">
            <div className="w-full lg:w-[50%] ">
              <Image
                className="rounded-2xl"
                src={image}
                alt={title}
                height={400}
                width={600}
              />
            </div>
            <div className="w-full lg:w-[50%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              <h3 className="text-2xl font-semibold mb-5">{title}</h3>
              <p className="text-base font-normal mb-10">{description}</p>
              <AccordionInfo data={faqs} />
            </div>
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: productData.details }} /> */}
          {/* <AccordionInfo /> */}
        </div>
      </div>
    );
  };

  const renderFAQSection = () => {
    if (!productData?.FAQ_list) {
      return null;
    }
    const { title, description, image, faqs } = productData?.FAQ_list;
    return (
      <div className="bg-[#f4f8fb]">
        <div className="py-12 container">
          <div className="lg:flex">
            <div className="w-full lg:w-[50%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              <h3 className="text-2xl font-semibold mb-5">{title}</h3>
              <p className="text-base font-normal mb-10">
                {description ? description : ""}
              </p>
              <AccordionInfo data={faqs} />
            </div>
            <div className="w-full lg:w-[50%] ">
              <Image
                className="rounded-2xl"
                src={image}
                alt={title}
                height={400}
                width={600}
              />
            </div>
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: productData.details }} /> */}
          {/* <AccordionInfo /> */}
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage `}>
      {/* MAIN */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[50%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16 relative">
                {selectedImage && (
                  <Image
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    src={selectedImage}
                    className="w-full rounded-2xl object-cover"
                    alt="Selected Product Image"
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {productData?.images &&
                productData.images.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-11 relative cursor-pointer"
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <Image
                        sizes="(max-width: 640px) 100vw, 33vw"
                        fill
                        src={item.image}
                        className={`w-full rounded-2xl object-cover ${
                          selectedImage === item.image
                            ? "border-2 border-blue-500"
                            : ""
                        }`}
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </div>
                  );
                })}
            </div>

            {/*  */}
            <hr className=" 2xl:!my-10 my-8 border-slate-200 dark:border-slate-700"></hr>
            {/*  */}

            {/* ---------- Specializations ----------  */}
            {productData?.specializations && (
              <>
                {productData?.specializations.length !== 0 ? (
                  <>
                    <h3 className="text-xl font-semibold mb-6">
                      Specializations
                    </h3>
                    {productData.specializations.map((s, i) => (
                      <div key={i}>
                        <p className="text-base font-medium">
                          {i + 1}. {s.title}
                        </p>
                        <p className="text-base font-normal">{s.value}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[50%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>
      </main>

      {/* DETAIL AND REVIEW */}

      {renderDetailSection()}
      <div className="container">
        <Image
          src={
            "https://hairrejuway.manageprojects.in/assets/images/products/ingredients.webp"
          }
          alt={"banner"}
          width={1920}
          height={600}
        />
      </div>

      {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

      {/* {renderReviews()} */}

      {renderBenefitsSection()}

      {renderHowToUseSection()}

      {renderIngredientsSection()}

      {renderFAQSection()}

      <div className="container">
        <Image
          className="rounded-2xl"
          src={
            "https://hairrejuway.manageprojects.in/assets/images/products/combo-img.webp"
          }
          alt={"banner"}
          width={1920}
          height={600}
        />
      </div>

      <div className="container">
        <ReviewsSlider />
      </div>

      {/* RELATED PRODUCTS SECTION */}
      <SectionGridFeatureItems />

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetail;
