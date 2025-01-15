import React, { FC } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import { getProductCategories, getProducts } from "@/api/products";
import ProductFilters from "./productFilters";

const Page = async ({}) => {
  const paginate = 8;
  const fetchedProducts = await getProducts(paginate);
  const categories = await getProductCategories();
  // console.log("prod with paginate..fggg...", fetchedProducts.meta);
  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              All Products
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <ProductFilters
            initialData={fetchedProducts.data}
            categories={categories.data}
            totalPagesCount={fetchedProducts.pagination.last_page}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
