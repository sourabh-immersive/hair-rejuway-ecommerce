import React, { FC } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import {
  getProductCategories,
  getProducts,
  getProductsByCatSlug,
  getProductsByQueryParams,
} from "@/api/products";
import { notFound } from "next/navigation";
import { Product } from "@/data/data";
import convertSlugToName from "@/utils/convertSlugToName";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const renderProducts = async () => {
    const start = performance.now();
    const products = await getProductsByCatSlug(slug);
    const end = performance.now();
    console.log(`Fetch Time: ${end - start}ms`);
    return (
      <>
        {products.data &&
        Array.isArray(products.data) &&
        products.data.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {products.data.map((item: Product, index: any) => (
              <ProductCard data={item} key={index} />
            ))}
          </div>
        ) : (
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
            <p>No products found!</p>
          </div>
        )}
      </>
    );
  };

  const fetchedProducts = await getProducts();
  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {convertSlugToName(slug)}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              Explore our {convertSlugToName(slug)} collection and find the
              perfect products for your needs. From skincare to haircare, we
              have everything you need to look and feel your best.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* TABS FILTER */}
            {/* <TabFilters /> */}

            {/* LOOP ITEMS */}
            {renderProducts()}

            {/* PAGINATION */}
            <div className="flex justify-center mt-5 lg:mt-5">
              {/* <Pagination /> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
