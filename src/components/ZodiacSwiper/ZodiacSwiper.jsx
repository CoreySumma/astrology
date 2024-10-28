/* eslint-disable import/no-unresolved */
import React from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFlip,
} from "swiper/modules";
import { updateSign } from "../../redux/actions/actions";
import "./ZodiacSwiper.css";
import "swiper/css/bundle";


const signs = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export default function ZodiacSwiper({ fade }) {
  const dispatch = useDispatch();

  const handleChange = (sign) => {
    dispatch(updateSign(sign));
  };

  return (
    <div className={`zodiac-container ${fade ? "fade-out" : ""}`}>
      <p className="zodiac-title">My zodiac sign is</p>
      <Swiper
        className="zodiacSwiper"
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectFlip]} 
        effect="flip"
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        navigation
        onSlideChange={(swiper) => {
          handleChange(signs[swiper.activeIndex]);
        }}
      >
        {signs.map((sign) => (
          <SwiperSlide key={sign}>
            <img src={`/images/${sign.toLowerCase()}w.png`} alt={sign} />
            <p className="image-description">{sign}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <br />
    </div>
  );
}
