"use client";

import { getProductsByCatSlug, getProductsByIds } from "@/api/products";
import { getWishlist } from "@/api/protected";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/data";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const wishData = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();
  const { items } = wishData;
  const authState = useAppSelector((state) => state.auth);
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const comSepIds = items.map((item) => item.id).join(",");
  console.log("comSepIds", comSepIds);
  useEffect(() => {
    const getWishlistItems = async () => {
      setLoading(true);
      try {
        if (authState.user?.token) {
          const response = await getWishlist(authState.user.token);
          console.log("getWishlist from server", response.data);

          if (response.status === true) {
            setProducts(response.data);
          }
        } else {
        }
        setLoading(false);
      } catch (error) {
        console.error("Error getting wishlist:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    const getProductsByIdsd = async () => {
      setLoading(true);
      try {
        const response = await getProductsByIds(comSepIds);

        if (response.status === true) {
          setProducts(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error getting wishlist:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (authState.status === "authenticated") {
      // Need to implement wishlist sync
      //   getWishlistItems();

      //getting redux ids and then fetching products
      getProductsByIdsd();
    } else {
      getProductsByIdsd();
    }
  }, [authState, wishData]);

  const Loader = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50"
      >
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    </AnimatePresence>
  );

  const renderSection1 = () => {
    return (
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Wishlist Products
            </h2>
            <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
              <Link href={"/"} className="" prefetch={true}>
                Home
              </Link>
              <span className="text-xs mx-1 sm:mx-1.5">/</span>
              <span className="underline">Wishlist</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 relative">
            {loading && <Loader />}
              {products && products.length === 0 ? (
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                  {products?.map((item: Product, index) => (
                    <ProductCard data={item} key={index} isLiked={true} />
                  ))}
                </div>
              )}
              {}
            </div>

            {/* <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
                {PRODUCTS.filter((_, i) => i < 6).map((stay) => (
                    <ProductCard key={stay.id} data={stay} />
                ))}
                </div> */}
            {/* <div className="flex !mt-20 justify-center items-center">
                <ButtonSecondary loading>Show me more</ButtonSecondary>
                </div> */}
          </div>
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default Page;
