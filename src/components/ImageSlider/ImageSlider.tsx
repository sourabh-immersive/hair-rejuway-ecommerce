import { getSliderImages } from "@/api/products";
import Slider from "./slider";

interface SliderProps {
  position: string;
}

const SwiperSlider: React.FC<SliderProps> = async ({ position }) => {
  const sliderTopImages = await getSliderImages(position);
  return (
    <div className="swiper-container">
      <Slider images={sliderTopImages.data} />
    </div>
  );
};

export default SwiperSlider;
