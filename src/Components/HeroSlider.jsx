import React from "react";

import lg1 from "../assets/img/logo_1.avif";
import lg2 from "../assets/img/logo_2.webp";
import lg3 from "../assets/img/logo_3.webp";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { ImPrevious } from "react-icons/im";

const HeroSlider = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={lg1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={lg2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={lg3} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HeroSlider;
