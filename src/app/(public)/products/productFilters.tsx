"use client";

import { getProductCategories, getProductsByQueryParams } from "@/api/products";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import { Product } from "@/data/data";
import Pagination from "@/shared/Pagination/Pagination";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface SwiperSliderProps {
  initialData: Product[];
  categories: Category[];
  totalPagesCount: number;
}

const ProductFilters: React.FC<SwiperSliderProps> = ({
  initialData,
  categories,
  totalPagesCount,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProducts, setProducts] = useState<Product[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(totalPagesCount);
  const [type, setType] = useState<"single" | "kit" | "">("");

  // console.log('filteredProducts ....',filteredProducts)
  const handleCatChange = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((category) => category !== slug)
        : [...prev, slug]
    );
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filteredData = await getProductsByQueryParams(
          selectedCategories,
          8,
          currentPage,
          type === "single" ? "normal" : type === "" ? "" : "kit"
        );
        //   console.log("filtereddata new page", filteredData.data.meta);
        setProducts(filteredData.data);
        setCurrentPage(currentPage);
        setTotalPages(filteredData.pagination.last_page);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategories, currentPage, type]);

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

  const renderType = () => {
    return (
      <div className="inline-flex border rounded-lg overflow-hidden min-w-fit">
        <button
          className={`px-4 py-2 text-base font-medium ${
            type === "single"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setType("single")}
        >
          Single
        </button>
        <button
          className={`px-4 py-2 text-base font-medium ${
            type === "kit"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setType("kit")}
        >
          Kit
        </button>
      </div>
    );
  };

  const renderFilters = () => {
    return (
      <div className="categoriesList">
        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
          Choose Category:
        </h3>
        <ul className="block max-w-[900px] overflow-hidden overflow-x-scroll whitespace-nowrap space-x-3 w-full">
          {categories.map((c) => (
            <li key={c.id} className="mb-2 inline-block">
              <input
                type="checkbox"
                id={`category-${c.id}`}
                checked={selectedCategories.includes(c.id)}
                className="hidden peer"
                onChange={() => handleCatChange(c.id)}
              />
              <label
                htmlFor={`category-${c.id}`}
                className="inline-flex items-center justify-between w-full p-2 px-4 text-gray-900 bg-white border-2 border-gray-200 rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-900 peer-checked:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-base font-semibold">{c.name}</div>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handlePageChange = (page: number) => {
    // console.log("clicked page", page);
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <main>
        {/* TABS FILTER */}
        {/* <TabFilters /> */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-5">
          {renderFilters()}
          {renderType()}
        </div>

        {/* LOOP ITEMS */}
        <div className="grid sm:grid-cols-2 relative lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
          {loading && <Loader />}
          {filteredProducts &&
            filteredProducts.map((item: Product, index: number) => (
              <ProductCard data={item} key={index} />
            ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-5 lg:mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductFilters;
