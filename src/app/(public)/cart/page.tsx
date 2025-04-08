"use client";

import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeItemFromCart } from "@/lib/features/cart/cartSlice";
import {
  CartItem,
  fullCart,
  LocalCartItem,
  removeFromCartAsync,
  removeItemLocally,
  syncCartWithServer,
} from "@/lib/features/cart/cartBSlice";
import { useEffect, useState } from "react";
import { getCart } from "@/api/protected";

const CartPage = () => {
  const cartData = useAppSelector((state) => state.cartB);
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.auth.status);
  const auth = useAppSelector((state) => state.auth);
  const [userCart, setUserCart] = useState<fullCart>();

  useEffect(() => {
    const getCartData = async () => {
      if (userStatus === "authenticated" && auth.user) {
        try {
          // Fetch cart data from server
          const response = await getCart(auth.user.token);
          const cartItems = response.data;
          setUserCart(cartItems);
          // console.log('cartItems', cartItems);
          // console.log("response from sync cart", response);
        } catch (error) {
          console.error("Failed to get cart:", error);
        }
      }
    }
    getCartData();
  }, [auth, userStatus]);

  const items =
    userStatus === "authenticated" ? userCart?.items : cartData.localItems;
  const totalItems =
    userStatus === "authenticated"
      ? userCart?.totals.total_items
      : cartData.localTotalItems;
  const totalPrice =
    userStatus === "authenticated"
      ? userCart?.totals.total_price
      : cartData.localTotalPrice;

  // console.log("items", items);

  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">Sold Out</span>
      </div>
    );
  };

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">In Stock</span>
      </div>
    );
  };

  const renderProduct = (item: LocalCartItem | CartItem, index: number) => {
    const { product_image, prices, name, key, product_id, variation, quantity } = item;

    return (
      <div
        key={index}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={product_image ? product_image : ""}
            alt={"product image"}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />
          <Link href="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link href="/product-detail">{name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {Array.isArray(variation) && (
                      <>
                        {variation.map((att, i) => (
                          <p key={i}>
                            <span>{att.attribute_title}</span>
                            <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                            <span>{att.attribute_value}</span>
                          </p>
                        ))}
                      </>
                    )}
                  </p>
                </div>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                  <Prices
                    price={prices?.regular_price}
                    salePrice={prices?.sale_price}
                    className="mt-0.5"
                  />
                </div>
              </div>

              <div className="hidden sm:block text-center relative">
                {/* <NcInputNumber className="relative z-10" /> */}
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices
                  price={prices?.regular_price}
                  salePrice={prices?.sale_price}
                  className="mt-0.5"
                />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {/* {Math.random() > 0.6
              ? renderStatusSoldout()
              : renderStatusInstock()} */}

            <p className="text-gray-500 dark:text-slate-400">{`Qty ${quantity}`}</p>

            <p
              className="relative cursor-pointer z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
              onClick={async () => {
                if (userStatus === "authenticated") {
                  try {
                    await dispatch(removeFromCartAsync(key || 0)).unwrap();
                    // Optional: Sync only if needed for server consistency
                    // await dispatch(syncCartWithServer()).unwrap();
                  } catch (error) {
                    console.error('Failed to remove item:', error);
                  }
                } else {
                  // console.log("remove locally", product_id);
                  dispatch(removeItemLocally(Number(product_id)));
                }
              }}
            >
              <span>Remove</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CartPage">
      <main className="container lg:pb-28 lg:pt-20 ">
        <div className="mb-12 sm:mb-16" >
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Cart
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              Home
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Cart</span>
          </div>
        </div>

        {/* <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" /> */}

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
            {items && items.map((item, index) => renderProduct(item, index))}
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="sticky top-28">
              <h3 className="text-lg font-semibold ">Order Summary</h3>
              <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                <div className="flex justify-between pb-4">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Shpping estimate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    ₹{userCart?.totals.total_shipping}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Tax estimate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    ₹{userCart?.totals.total_tax}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>Order total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
              <ButtonPrimary href="/checkout" className="mt-8 w-full">
                Checkout
              </ButtonPrimary>
              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                <p className="block relative pl-5">
                  <svg
                    className="w-4 h-4 absolute -left-1 top-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9945 16H12.0035"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Learn more{` `}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="##"
                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                  >
                    Taxes
                  </a>
                  <span>
                    {` `}and{` `}
                  </span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="##"
                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                  >
                    Shipping
                  </a>
                  {` `} infomation
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
