"use client";

import { Popover, Transition } from "@/app/headlessui";
import Prices from "@/components/Prices";
import { Product } from "@/data/data";
import { Fragment } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartItem } from "@/lib/features/cart/cartSlice";
import {
  clearCartAsync,
  clearCartLocally,
  removeFromCartAsync,
  removeItem,
  removeItemLocally,
  syncCartWithServer,
} from "@/lib/features/cart/cartBSlice";

export default function CartDropdown() {
  const cartData = useAppSelector((state) => state.cartB);
  const userStatus = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();

  const items =
    userStatus === "authenticated" ? cartData.items : cartData.localItems;
  const totalItems =
    userStatus === "authenticated"
      ? cartData.totalItems
      : cartData.localTotalItems;
  const totalPrice =
    userStatus === "authenticated"
      ? cartData.totalPrice
      : cartData.localTotalPrice;

  // console.log("stateDfgg cartData", cartData);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(syncCartWithServer());
  //   }
  // }, [isAuthenticated, dispatch]);

  const renderProduct = (items: CartItem, index: number, close: () => void) => {
    const { name, price, thumbnail, attributesData, salePrice, productType } =
      items;

    return (
      <div key={index} className="flex py-5 last:pb-0 00000000">
        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={`${thumbnail}`}
            alt={name}
            className="h-full w-full object-contain object-center"
          />
          <Link
            onClick={close}
            className="absolute inset-0"
            href={"/product-detail"}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  <Link onClick={close} href={"/product-detail"}>
                    {name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {Array.isArray(attributesData) && (
                    <>
                      {attributesData.map((att, i) => (
                        <>
                          <p>
                            <span>{att.name}</span>
                            <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                            <span>{att.value}</span>
                          </p>
                        </>
                      ))}
                    </>
                  )}
                </p>
              </div>
              <Prices price={price} salePrice={salePrice} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">{`Qty 1`}</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
              <span className="mt-[1px]">{totalItems}</span>
            </div>
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 8H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Link className="block md:hidden absolute inset-0" href={"/cart"} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <div className="relative bg-white dark:bg-neutral-800">
                  <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Shopping cart</h3>
                      <button
                        className="text-sm font-normal"
                        onClick={() => {
                          console.log("clear cart ");
                          dispatch(clearCartAsync());
                        }}
                      >
                        Clear Cart!
                      </button>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                      {items.length === 0 ? (
                        <div className="empty-state text-center p-4">
                          {/* Render UI when the array is empty */}
                          <svg
                            className="w-6 h-6 ml-auto mr-auto mb-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 8H21"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>No items available</p>
                        </div>
                      ) : (
                        items.map((item: any, index: any) => (
                          <div key={index} className="flex py-5 last:pb-0">
                            <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                              {item.product_image && (
                                <Image
                                  fill
                                  src={`${item.product_image}`}
                                  alt={item.name || ""}
                                  className="h-full w-full object-contain object-center"
                                />
                              )}
                              <Link
                                onClick={close}
                                className="absolute inset-0"
                                href={"/product-detail"}
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between ">
                                  <div>
                                    <h3 className="text-base font-medium ">
                                      <Link
                                        onClick={close}
                                        href={"/product-detail"}
                                      >
                                        {item.name}
                                      </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                      {Array.isArray(item.variation) && (
                                        <>
                                          {item.variation.map(
                                            (att: any, i: any) => (
                                              <p key={i}>
                                                <span>
                                                  {att.attribute_title}
                                                </span>
                                                <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                                <span>
                                                  {att.attribute_value}
                                                </span>
                                              </p>
                                            )
                                          )}
                                        </>
                                      )}
                                    </p>
                                  </div>
                                  <Prices
                                    price={item.prices?.regular_price}
                                    salePrice={item.prices?.sale_price}
                                    className="mt-0.5"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500 dark:text-slate-400">{`Qty ${
                                  userStatus === "authenticated"
                                    ? item.quantity
                                    : item.product_qty
                                }`}</p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-primary-6000 dark:text-primary-500 "
                                    // onClick={() => dispatch(removeItem(item.key!))}
                                    onClick={() => {
                                      if (userStatus === "authenticated") {
                                        dispatch(
                                          removeFromCartAsync(item.key || 0)
                                        );
                                        dispatch(syncCartWithServer());
                                      } else {
                                        console.log(
                                          "remove locally",
                                          item.product_id
                                        );
                                        dispatch(
                                          removeItemLocally(
                                            Number(item.product_id)
                                          )
                                        );
                                      }
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                      {}
                    </div>
                  </div>
                  <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                    <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                      <span>
                        <span>Subtotal</span>
                        <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                          Shipping and taxes calculated at checkout.
                        </span>
                      </span>
                      <span className="">₹{totalPrice}</span>
                    </p>
                    <div className="flex space-x-2 mt-5">
                      <ButtonSecondary
                        href="/cart"
                        className="flex-1 border border-slate-200 dark:border-slate-700"
                        onClick={close}
                      >
                        View cart
                      </ButtonSecondary>
                      <ButtonPrimary
                        href="/checkout"
                        onClick={close}
                        className="flex-1"
                      >
                        Check out
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
