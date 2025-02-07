"use client";

import React, { FC, useEffect, useState } from "react";
import HeaderFilterSection from "@/components/HeaderFilterSection";
import ProductCard from "@/components/ProductCard";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Product } from "@/data/data"; // Assuming `Product` is the type
import { getProducts } from "@/api/products";
import Heading from "./Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export interface SectionGridFeatureItemsProps {
  data?: Product[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
  data = [],
}) => {
  const [products, setProducts] = useState<Product[]>(data);
  const [loading, setLoading] = useState<boolean>(false);
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProducts({paginate: 4});
        setProducts(fetchedProducts.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handler for the 'Show me more' button
  // const handleShowMore = async () => {
  //   setShowMoreLoading(true); // Set show more loading state
  //   try {
  //     const moreProducts = await getProducts(); // Assuming the same endpoint for loading more products
  //     setProducts((prev) => [...prev, ...moreProducts]); // Append new products
  //   } catch (error) {
  //     console.error("Error loading more products:", error);
  //   } finally {
  //     setShowMoreLoading(false); // Turn off loading after API call
  //   }
  // };

  return (
    <div className="nc-SectionGridFeatureItems relative py-10">
      <div className="container">
        {/* <HeaderFilterSection /> */}
        {/* <Heading>{`What's trending now`}</Heading> */}
        <div className="flex justify-between border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-semibold">Trending Bestsellers</h2>
          <ButtonSecondary
            className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
            fontSize="text-sm"
            sizeClass="py-2 px-4"
          >
            See All
          </ButtonSecondary>
        </div>
        {loading ? (
          <div className="text-center">Loading products...</div>
        ) : (
          <div
            className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
          >
            {products &&
              products.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionGridFeatureItems;
