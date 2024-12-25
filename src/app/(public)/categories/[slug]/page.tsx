import React, { FC } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import {
  getProductCategories,
  getProducts,
  getProductsByCatId,
} from "@/api/products";
import { notFound } from "next/navigation";
import { Product } from "@/data/data";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const categoriesResponse = await getProductCategories();
  const categories = categoriesResponse.data;

  const category = categories.find((c: any) => c.slug === slug);

  if (!category) {
    return notFound();
  }
  const id = category.id;

  const renderProducts = async () => {
    const products = await getProductsByCatId(id);
    return (
      <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
          {products.data.map((item: Product, index: any) => (
            <ProductCard data={item} key={index} />
          ))}
        </div>
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
              {category.name}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
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
