import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/data";
import { getProducts } from "@/api/products";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { FC } from "react";
import Link from "next/link";

export interface SectionGridFeatureItemsProps {
  data?: Product[];
}

const ProductsGrid: FC<SectionGridFeatureItemsProps> = async ({
  data = [],
}) => {
  try {
    const fetchedProducts = await getProducts({ paginate: 8 });
    // console.log('fetchedProducts dgfdgdfgf', fetchedProducts)
    return (
      <div className="productsGrid">
        <div className="nc-SectionGridFeatureItems relative py-10">
          <div className="flex justify-between border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-2xl font-semibold">Trending Products</h2>
            <Link href={"/products"} prefetch={true} >
              <ButtonSecondary
                className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
                fontSize="text-sm"
                sizeClass="py-2 px-4"
              >
                See All
              </ButtonSecondary>
            </Link>
          </div>

          <div
            className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
          >
            {fetchedProducts.data.map((item: any, index: any) => (
              <ProductCard data={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return (
      <div className="text-center text-red-500">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default ProductsGrid;
