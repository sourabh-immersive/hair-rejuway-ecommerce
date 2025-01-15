import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";
import SectionHero3 from "@/components/SectionHero/SectionHero3";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/components/SectionPromo3";
import SectionPromo4 from "@/components/SectionPromo4";
import SectionFeatures from "@/components/SectionFeatures";
import SectionServices from "@/components/SectionServices";
import SectionHairgrowth from "@/components/SectionHairgrowth";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "./blog/SectionMagazine5";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import AllCategories from "@/components/AllCategories/AllCategories";
import ProductsGrid from "@/components/ProductsGrid/ProductsGrid";
import PromoBanner from "@/components/PromotionalBanner/PromoBanner";
import { getProducts, getSliderImages } from "@/api/products";
import ImageSlider from "@/components/ImageSlider/ImageSlider";

async function PageHome() {
  const sliderTopImages = await getSliderImages("top");
  const sliderCenterImages = await getSliderImages("center");
  const sliderBottomImages = await getSliderImages("bottom");
  const fetchedProducts = await getProducts(8);
  // console.log('fetchedProducts data 10', fetchedProducts);
  return (
    <div className="nc-PageHome relative overflow-hidden">
      {sliderTopImages.data.length !== 0 ? (
        <ImageSlider images={sliderTopImages.data} />
      ) : (
        ""
      )}
      <div className="container relative">
        <AllCategories />
        <ProductsGrid />
        <PromoBanner />
        <SectionSliderProductCard initialData={fetchedProducts.status ? fetchedProducts.data : []} />
        {sliderCenterImages.data.length !== 0 ? (
          <ImageSlider images={sliderCenterImages.data} />
        ) : (
          ""
        )}
        <SectionSliderProductCard initialData={fetchedProducts.status ? fetchedProducts.data : []} />
      </div>
      <SectionFeatures />
      <div className="relative space-y-20 my-20 lg:space-y-20 lg:my-10">
        <SectionClientSay />
      </div>
      <SectionServices />
      <div className="container relative space-y-20 my-20 lg:space-y-20 lg:my-10">
        {sliderBottomImages.data.length !== 0 ? (
          <ImageSlider images={sliderBottomImages.data} />
        ) : (
          ""
        )}
      </div>

      {/* <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">*/}
      {/* <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>
        <SectionPromo1 />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">  
          <SectionSliderProductCard heading="Best Sellers" subHeading="Best selling of the month"/>
        </div>*/}
      {/* <div className="container relative space-y-20 my-20 lg:space-y-20 lg:my-20">
        <SectionSliderProductCard
          data={[
            PRODUCTS[4],
            SPORT_PRODUCTS[5],
            PRODUCTS[7],
            SPORT_PRODUCTS[1],
            PRODUCTS[6],
          ]}
        />
      </div> */}

      {/*<SectionPromo2 />

        <SectionSliderLargeProduct cardStyle="style2" />

        

        <SectionPromo3 />

        

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div> */}

      {/* </div> */}
    </div>
  );
}

export default PageHome;
