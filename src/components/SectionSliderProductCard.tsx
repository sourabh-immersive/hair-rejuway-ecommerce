"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import { Product } from "@/data/data";
import { getProducts } from "@/api/products";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "",
  data = [],
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<Product[]>(data);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProducts(10);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!sliderRef.current || products.length === 0) return;

    const OPTIONS: Partial<Glide.Options> = {
      type: "carousel",
      perView: 4,
      gap: 32,
      rewind: true,
      breakpoints: {
        1280: { perView: 3 },
        1024: { gap: 20, perView: 3 },
        768: { gap: 20, perView: 2 },
        640: { gap: 20, perView: 1.5 },
        500: { gap: 20, perView: 1.3 },
      },
    };

    const slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();

    return () => {
      slider.destroy();
    };
  }, [products]); // Reinitialize when products change

  return (
    <div className={`nc-SectionSliderProductCard py-10 ${className}`}>
      <div className="flow-root">
        {loading ? (
          <div className="text-center">Loading products...</div>
        ) : (
          <div
            className="glide prodSlider"
            ref={sliderRef} // Attach the ref here
          >
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-5">
              <div>
                <div className="text-md text-blue-500 mb-2">Hot Sale</div>
                <h2 className="text-2xl font-semibold">Latest Products</h2>
              </div>
              {/* Arrows */}
              <div
                className="glide__arrows flex space-x-2"
                data-glide-el="controls"
              >
                <button
                  className="glide__arrow glide__arrow--left border-2 p-2 border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center"
                  data-glide-dir="<"
                >
                  <svg
                    className="w-5 h-5 rtl:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.5 12H3.67004"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="glide__arrow glide__arrow--right border-2 p-2 border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center"
                  data-glide-dir=">"
                >
                  <svg
                    className="w-5 h-5 rtl:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.5 12H20.33"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Slider Content */}
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {products.map((item, index) => (
                  <li
                    key={index}
                    className={`glide__slide ${itemClassName} border-0 border-gray-300 rounded-md`}
                  >
                    <ProductCard data={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
