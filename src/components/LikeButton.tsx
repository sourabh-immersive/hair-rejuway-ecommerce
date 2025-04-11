"use client";

import {
  addToWishlistAsync,
  removeFromWishlistAsync,
  addItemLocally,
  removeItemLocally,
} from "@/lib/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";

interface LikeButtonProps {
  productId: string;
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ productId, className = "" }) => {
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector((state) => state.auth);
  const isLiked = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.product_id === productId)
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggle = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (status === "authenticated" && user?.token) {
        const response = await dispatch(addToWishlistAsync(productId)).unwrap();
        console.log('item added to wishlist', response);
      } else {
        if (isLiked) {
          dispatch(removeItemLocally(productId));
        } else {
          dispatch(addItemLocally({ product_id: productId }));
        }
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg ${className}`}
      onClick={handleToggle}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <span className="text-xs">...</span>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
            stroke={isLiked ? "#ef4444" : "currentColor"}
            fill={isLiked ? "#ef4444" : "none"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default LikeButton;