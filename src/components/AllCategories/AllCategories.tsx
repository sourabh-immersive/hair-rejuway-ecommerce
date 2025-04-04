import { getProductCategories } from "@/api/products";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Tabs from "@/shared/tabs/Tabs";

const AllCategories = async () => {
  try {
    const categories = await getProductCategories();

    const tabs = [
      {
        title: "Hair",
        content: (
          <div className="grid grid-cols-6 gap-3">
          {categories.data.map((c: any, i: any) => (
            <Link href={`/categories/${c.slug}`} key={i}>
              <div className="block p-2">
                <Image
                  className="rounded-full"
                  src={c.image}
                  width={250}
                  height={250}
                  alt={c.name}
                />
                <h4 className="text-base font-semibold text-center mt-4">
                  {c.name} <span className="hidden">{`(${c.count})`}</span>
                </h4>
              </div>
            </Link>
          ))}
        </div>
        ),
      },
      {
        title: "Skin",
        content: (
          <div className="grid grid-cols-6 gap-3">
          {categories.data.map((c: any, i: any) => (
            <Link href={`/categories/${c.slug}`} key={i}>
              <div className="block p-2">
                <Image
                  className="rounded-full"
                  src={c.image}
                  width={250}
                  height={250}
                  alt={c.name}
                />
                <h4 className="text-base font-semibold text-center mt-4">
                  {c.name} <span className="hidden">{`(${c.count})`}</span>
                </h4>
              </div>
            </Link>
          ))}
        </div>
        ),
      },
    ];

    return (
      <div className="categories my-10">
        <h2 className="text-2xl text-center font-semibold mb-8">
          Shop by Category
        </h2>
        <Tabs tabs={tabs} />
        {/* <div className="grid grid-cols-6 gap-3">
          {categories.data.map((c: any, i: any) => (
            <Link href={`/categories/${c.slug}`} key={i}>
              <div className="block p-2">
                <Image
                  className="rounded-full"
                  src={c.image}
                  width={250}
                  height={250}
                  alt={c.name}
                />
                <h4 className="text-base font-semibold text-center mt-4">
                  {c.name} <span className="hidden">{`(${c.count})`}</span>
                </h4>
              </div>
            </Link>
          ))}
        </div> */}
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

export default AllCategories;
