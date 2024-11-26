'use client'

import React, { FC, useEffect, useState } from "react";
import HeaderFilterSection from "@/components/HeaderFilterSection";
import ProductCard from "@/components/ProductCard";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Product } from "@/data/data"; // Assuming `Product` is the type
import { getProducts } from "@/api/products";
import Heading from "./Heading/Heading";

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
        const fetchedProducts = await getProducts();
        // console.log(fetchedProducts)

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handler for the 'Show me more' button
  const handleShowMore = async () => {
    setShowMoreLoading(true); // Set show more loading state
    try {
      const moreProducts = await getProducts(); // Assuming the same endpoint for loading more products
      setProducts((prev) => [...prev, ...moreProducts]); // Append new products
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setShowMoreLoading(false); // Turn off loading after API call
    }
  };

  return (
    <div className="nc-SectionGridFeatureItems relative">
      {/* <HeaderFilterSection /> */}
      <Heading>{`What's trending now`}</Heading>
      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
          {products.map((item, index) => (
            <ProductCard data={item} key={index} />
          ))}
        </div>
      )}
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading={showMoreLoading} onClick={handleShowMore}>
          Show me more
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureItems;