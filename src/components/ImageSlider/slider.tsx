"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageData {
  id: string;
  image: string;
}
interface SwiperSliderProps {
  images: ImageData[];
}

const Slider: React.FC<SwiperSliderProps> = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      // navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop
    >
      {images.map((i, index) => (
        <SwiperSlide key={index}>
          <Image
            src={i.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-auto"
            width={1200}
            height={250}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
