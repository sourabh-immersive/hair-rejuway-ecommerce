import React from "react";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import SectionFeatures from "@/components/SectionFeatures";
import SectionServices from "@/components/SectionServices";
import AllCategories from "@/components/AllCategories/AllCategories";
import ProductsGrid from "@/components/ProductsGrid/ProductsGrid";
import PromoBanner from "@/components/PromotionalBanner/PromoBanner";
import { getProducts, getSliderImages } from "@/api/products";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import Link from "next/link";
import ReviewsSlider from "@/components/Reviews/reviews";

async function PageHome() {
  // const start = performance.now();
  // const sliderTopImages = await getSliderImages("top");
  // const sliderCenterImages = await getSliderImages("center");
  // const sliderBottomImages = await getSliderImages("bottom");
  

  // const [sliderTopImages, sliderCenterImages, sliderBottomImages, fetchedProducts] = await Promise.all([
  //   getSliderImages("top"),
  //   getSliderImages("center"),
  //   getSliderImages("bottom"),
  //   getProducts(8),
  // ]);

  // const end = performance.now();
  // console.log('fetchedProducts data 10', fetchedProducts);
  // console.log('sliderTopImages', sliderTopImages)
  return (
    <div className="nc-PageHome relative overflow-hidden">
        <ImageSlider position={'top'} />
      <div className="container relative">
        <AllCategories />
        <ProductsGrid />
        <PromoBanner />
        <SectionSliderProductCard
          heading={"Skin Care Products"}
          category={"Skin"}
        />
          <Link href={"/products"} prefetch={true}>
            <ImageSlider position={'center'} />
          </Link>
        <SectionSliderProductCard
          heading={"Popular Hair Products"}
          category={"Hair"}
        />
      </div>
      <SectionFeatures />
      <div className="container">
        <ReviewsSlider />
      </div>

      <SectionServices />
      <div className="container relative space-y-20 my-20 lg:space-y-20 lg:my-10">
          <ImageSlider position={'bottom'} />
      </div>
    </div>
  );
}

export default PageHome;
