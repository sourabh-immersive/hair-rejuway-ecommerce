"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Heading from "../Heading/Heading";

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
    image: "/results/2.webp",
  },
  {
    name: "Anonymous",
    date: "15 AUG 2021",
    rating: 5,
    review: `Results in just 5 months, couldn't believe my eyes when I saw hair growth on my head. 
              Anyone with hair problems should get on their plan. It works like magic.`,
    kit: "On complete Traya recommended plan",
    usedFor: "5 Months",
    image: "/results/2.webp",
  },
  {
    name: "Anonymous",
    date: "15 AUG 2021",
    rating: 5,
    review: `Results in just 5 months, couldn't believe my eyes when I saw hair growth on my head. 
              Anyone with hair problems should get on their plan. It works like magic.`,
    kit: "On complete Traya recommended plan",
    usedFor: "5 Months",
    image: "/results/2.webp",
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
    image: "/results/2.webp",
  },
];

const ReviewsSlider = () => {
  return (
    <div className="w-full px-4 py-10 pb-16">
      <div className="text-md text-blue-500 mb-2 text-center">
        Clients Reactions
      </div>
      <Heading isCenter>What Our People Say</Heading>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        // navigation
        pagination={{ clickable: true }}
        loop
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 border mb-10 border-gray-300 rounded-lg flex flex-col max-w-md mx-auto min-h-[550px]">
              <Image
                src={review.image}
                alt={review.name}
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mt-4">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex text-yellow-400 mt-2 text-2xl">
                  {"★".repeat(review.rating)}
                </div>
              </div>

              <hr className="border-slate-200 dark:border-slate-700 my-4" />
              <div className="flex flex-col justify-between">
                <p className="text-gray-700 text-sm mt-2 min-h-36">
                  {review.review}
                </p>
                <div className="mt-4 text-sm text-gray-600">
                  <p className="mb-4">
                    <strong>Kit Purchased:</strong> {review.kit}
                  </p>
                  <p>
                    <strong>Used for:</strong> {review.usedFor}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsSlider;
