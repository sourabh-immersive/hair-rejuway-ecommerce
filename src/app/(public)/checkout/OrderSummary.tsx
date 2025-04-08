"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Prices from "@/components/Prices";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import { useAppDispatch } from "@/lib/hooks";
import {
  removeFromCartAsync,
  removeItemLocally,
} from "@/lib/features/cart/cartBSlice";
import { AnimatePresence, motion } from "framer-motion";

interface OrderSummaryProps {
  items: any[];
  totalPrice: number;
  totalItems: number;
  isLoading: boolean;
  userStatus: string;
  isSubmitting: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalPrice,
  totalItems,
  isLoading,
  userStatus,
  isSubmitting,
}) => {
  const dispatch = useAppDispatch();

  const renderProduct = useCallback(
    (item: any, index: number) => {
      const {
        product_image,
        prices,
        name,
        key,
        product_id,
        variation,
        quantity,
        product_qty,
      } = item;
      const qty = quantity || product_qty || "1";

      const handleRemove = async () => {
        try {
          if (userStatus === "authenticated") {
            await dispatch(removeFromCartAsync(key || 0)).unwrap();
          } else {
            dispatch(removeItemLocally(Number(product_id)));
          }
        } catch (error) {
          console.error("Failed to remove item:", error);
        }
      };

      return (
        <div key={index} className="flex py-4">
          <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <Image
              fill
              src={product_image || ""}
              alt={name || "product"}
              className="object-contain object-center"
            />
            <Link href="/product-detail" className="absolute inset-0" />
          </div>
          <div className="ml-4 flex-1 flex flex-col">
            <h3 className="text-base font-semibold">
              <Link href="/product-detail">{name}</Link>
            </h3>
            <p className="text-sm text-slate-600">
              {variation?.map((att: any, i: number) => (
                <span key={i}>
                  {att.attribute_title}: {att.attribute_value}
                  {i < variation.length - 1 && ", "}
                </span>
              ))}
            </p>
            <div className="flex justify-between mt-auto text-sm">
              <span className="text-gray-500">Qty {qty}</span>
              <Prices
                price={prices?.regular_price}
                salePrice={prices?.sale_price}
              />
              {/* <span className="text-primary-6000 hover:text-primary-500 cursor-pointer" onClick={handleRemove}>Remove</span> */}
            </div>
          </div>
        </div>
      );
    },
    [dispatch, userStatus]
  );

  const orderTotal = (totalPrice + 5 + 24.9).toFixed(2); // Shipping + Tax

  return (
    <div className="w-full lg:w-[36%] lg:border-l border-slate-200 lg:my-0 lg:ml-10 lg:pl-10">
      <h3 className="text-lg font-semibold">Order Summary</h3>
      <div className="mt-4 divide-y divide-slate-200/70">
        {isLoading ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="p-28 bg-white flex items-center justify-center z-50"
              >
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : items.length ? (
          items.map(renderProduct)
        ) : (
          <p className="py-4 text-slate-500">Cart is empty</p>
        )}
      </div>
      <div className="mt-6 pt-4 text-sm text-slate-500 border-t border-slate-200/70">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900">
              ₹{totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-slate-900">₹00.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-semibold text-slate-900">₹00.00</span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-4 border-t border-slate-200/70">
            <span>Total</span>
            <span>₹{orderTotal}</span>
          </div>
        </div>
        <div className="mt-4">
          <Label>Discount code</Label>
          <div className="flex mt-1.5">
            <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
            <button className="ml-2 px-4 py-2 bg-neutral-200/70 hover:bg-neutral-100 rounded-2xl border border-neutral-200">
              Apply
            </button>
          </div>
        </div>
        <ButtonPrimary
          className="mt-6 w-full"
          type="submit"
          disabled={isSubmitting || !items.length}
        >
          {isSubmitting ? "Processing..." : "Confirm Order"}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default OrderSummary;
