import { getPageBySlug } from "@/api/products";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, { ReactNode } from "react";

const Page = async () => {
  const returnPage = await getPageBySlug("return-policy");
  const data: { title: string; slug: string; content: any } = returnPage && returnPage.data[0];

  return (
    <div>
      <div className="about-hero py-10">
        <div className="container my-auto">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block mb-5 text-2xl py-10 sm:text-3xl lg:text-4xl font-semibold">
              {data.title}
            </h2>
          </div>
          <hr className="border-slate-200 dark:border-slate-700" />
        </div>
      </div>
      <div className="container pb-7">
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
