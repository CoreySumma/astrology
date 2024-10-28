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
import SwiperCore from "swiper/core";
import { updateSign } from "../../redux/actions/actions";
import "./ZodiacSwiper.css";
import "swiper/css/bundle";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFlip]);

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
        className="mySwiper"
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
