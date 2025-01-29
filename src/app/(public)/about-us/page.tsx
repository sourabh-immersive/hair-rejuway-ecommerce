import { getPageBySlug } from "@/api/products";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, { ReactNode } from "react";

const Page = async () => {
  const aboutPage = await getPageBySlug("about-us");
  const data: { title: string; slug: string; content: any } = aboutPage && aboutPage.data[0];

  return (
    <div>
      <div className="about-hero min-h-[550px] py-16 bg-[url('/banners/about-banner.webp')] bg-no-repeat bg-cover bg-center">
        <div className="container my-auto pt-12">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h4 className="mb-4">We Empathise</h4>
            <h2 className="block mb-5 text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Scientific solutions to stubborn problems
            </h2>
            <p className="mb-5">
              Hair Rejuway was born of a quest to find a scientific solution to
              a stubborn problem that many people face, hair loss.
            </p>
            <ButtonPrimary
              className=""
              fontSize="text-base"
              sizeClass="py-4 px-6"
            >
              <span className="ms-1">TAKE THE HAIR TEST</span>
            </ButtonPrimary>
          </div>
        </div>
      </div>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-5 lg:space-y-5">
          <div className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
