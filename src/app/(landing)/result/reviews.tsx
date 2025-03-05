"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Heading from "@/components/Heading/Heading";

const reviews = [
  {
    name: "Siddharth",
    date: "4 MARCH 2020",
    rating: 5,
    review: `I was losing a lot of hair due to the lockdown and desperate for a solution, 
              that is when a friend recommended Traya. I gave it a shot and after 4 months 
              of use, I can definitely say that their holistic approach to treating hair loss 
              with both ayurveda and allopathy just works.`,
    kit: "On complete Traya recommended plan",
    usedFor: "4 Months",
    image: "/results/t1.png",
  },
  {
    name: "Anonymous",
    date: "15 AUG 2021",
    rating: 5,
    review: `Results in just 5 months, couldn't believe my eyes when I saw hair growth on my head. 
              Anyone with hair problems should get on their plan. It works like magic.`,
    kit: "On complete Traya recommended plan",
    usedFor: "5 Months",
    image: "/results/t2.png",
  },
  {
    name: "Anonymous",
    date: "15 AUG 2021",
    rating: 5,
    review: `Results in just 5 months, couldn't believe my eyes when I saw hair growth on my head. 
              Anyone with hair problems should get on their plan. It works like magic.`,
    kit: "On complete Traya recommended plan",
    usedFor: "5 Months",
    image: "/results/t3.png",
  },
  {
    name: "Akash Agarwal",
    date: "2 FEB 2021",
    rating: 5,
    review: `I came to Traya with a bald patch and I did not expect any drastic results. My motive was 
              to stop further hair loss, after dedicatedly following the plan and one can tell how it 
              has changed my hair. I have baby hair all over my scalp and thicker growth. 
              This is a dream, thank you guys you are the best!`,
    kit: "On complete Traya recommended plan",
    usedFor: "8 Months",
    image: "/results/t1.png",
  },
  {
    name: "Anonymous",
    date: "15 AUG 2021",
    rating: 5,
    review: `Results in just 5 months, couldn't believe my eyes when I saw hair growth on my head. 
              Anyone with hair problems should get on their plan. It works like magic.`,
    kit: "On complete Traya recommended plan",
    usedFor: "5 Months",
    image: "/results/t2.png",
  },
];

const ReviewsSlider = () => {
  return (
    <div className="section bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="w-full py-10 pb-5">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Testimonials of patients
          </h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={1} // Default for mobile
            breakpoints={{
              640: {
                slidesPerView: 2, // 2 slides on tablets (sm breakpoint)
              },
              1024: {
                slidesPerView: 3, // 3 slides on laptops (lg breakpoint)
              },
              1280: {
                slidesPerView: 4, // 4 slides on desktops (xl breakpoint)
              },
            }}
            pagination={{ clickable: true }}
            loop
            className="mb-12"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-6 shadow-md rounded-lg flex flex-col max-w-md mx-auto min-h-[512px] mb-12">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={600}
                    height={400}
                    className="rounded-lg object-contain"
                  />
                  <div className="text-center">
                    <div>
                      <h3 className="text-lg font-semibold mt-4">
                        {review.name}
                      </h3>
                      <div className="flex text-yellow-400 mt-2 justify-center text-2xl">
                        {"★".repeat(review.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <p className="text-gray-700 text-center text-sm mt-2 min-h-32">
                      {review.review}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSlider;
