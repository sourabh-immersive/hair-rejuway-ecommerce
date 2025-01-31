
"use client";

import { addUpdateWishlist } from "@/api/protected";
import {
  addItemToWishlist,
  WishlistItem,
} from "@/lib/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";

export interface LikeButtonProps {
  className?: string;
  liked?: boolean;
  data: WishlistItem;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className = "",
  liked = false,
  data,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const wishlistData = useAppSelector((state) => state.wishlist);
  const { id, name, thumbnail, price } = data;
  const existingItemIndex = wishlistData.items.findIndex(
    (item) => item.id === id
  );

  useEffect(() => {
    setIsLiked(existingItemIndex >= 0);
  }, [existingItemIndex]);

  const handleAddToWishlist = async (item: WishlistItem) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (authState.user?.token) {
        const response = await addUpdateWishlist(authState.user.token, item.id);
        console.log('wish add res response', response.data);
        if (response.status === true) {
          dispatch(addItemToWishlist(item));
          setIsLiked(true);
        }
      } else {
        dispatch(addItemToWishlist(item));
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      setIsLiked(false); // Reset liked state on error
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg ${className}`}
      onClick={() =>
        handleAddToWishlist({
          id: id,
          name: name,
          thumbnail: thumbnail,
          price: price,
        })
      }
      disabled={isProcessing}
    >
      {isProcessing ? (
        // <Spinner />
        <p></p>
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















// "use client";

// import { addUpdateWishlist } from "@/api/protected";
// import {
//   addItemToWishlist,
//   WishlistItem,
// } from "@/lib/features/wishlist/wishlistSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import React, { useEffect, useState } from "react";

// export interface LikeButtonProps {
//   className?: string;
//   liked?: boolean;
//   data: WishlistItem;
// }

// const LikeButton: React.FC<LikeButtonProps> = ({
//   className = "",
//   liked = false,
//   data,
// }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const dispatch = useAppDispatch();
//   const authState = useAppSelector((state) => state.auth);
//   const wishlistData = useAppSelector((state) => state.wishlist);
//   const { id, name, thumbnail, price } = data;
//   const existingItemIndex = wishlistData.items.findIndex(
//     (item) => item.id === id
//   );

//   const handleAddToWishlist = async (item: WishlistItem) => {
//     if (isProcessing) return;
//     setIsProcessing(true);

//     try {
//       if (authState.user?.token) {
//         const response = await addUpdateWishlist(authState.user.token, item.id);
//         console.log('wish add res response', response.data)
//         if (response.status === true) {
//           dispatch(addItemToWishlist(item));
//           setIsLiked(true);
//         }
//       } else {
//         dispatch(addItemToWishlist(item));
//         setIsLiked(true);
//       }
//     } catch (error) {
//       console.error("Error adding item to wishlist:", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   useEffect(() => {
//     setIsLiked(Math.random() > 0.5);
//   }, []);

//   return (
//     <button
//       className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg ${className}`}
//       onClick={() =>
//         handleAddToWishlist({
//           id: id,
//           name: name,
//           thumbnail: thumbnail,
//           price: price,
//         })
//       }
//       disabled={isProcessing}
//     >
//       <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
//         <path
//           d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
//           stroke={existingItemIndex >= 0 ? "#ef4444" : "currentColor"}
//           fill={existingItemIndex >= 0 ? "#ef4444" : "none"}
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </button>
//   );
// };

// export default LikeButton;