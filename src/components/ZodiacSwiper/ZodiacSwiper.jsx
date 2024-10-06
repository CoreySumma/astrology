import React from "react";
import { useDispatch } from "react-redux";
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFlip,
  // eslint-disable-next-line import/no-unresolved
} from "swiper/modules";
// eslint-disable-next-line import/no-unresolved
import SwiperCore from "swiper/core";
import "./ZodiacSwiper.css";
import { updateSign } from "../../actions";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/bundle";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFlip]);

export default function ZodiacSwiper({ setSign, fade }) {
  const dispatch = useDispatch();

  const handleChange = (sign) => {
    setSign(sign);
    dispatch(updateSign(sign));
  };

  return (
    <form className={`form-container ${fade ? "fade-out" : ""}`}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <p className="form-title">My zodiac sign is</p>
        <Swiper
          className="mySwiper"
          effect="flip"
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={(swiper) => {
            // Save the index of the active slide through swiper
            const activeSlideIndex = swiper.activeIndex;
            const signs = [
              "aries",
              "taurus",
              "gemini",
              "cancer",
              "leo",
              "virgo",
              "libra",
              "scorpio",
              "sagittarius",
              "capricorn",
              "aquarius",
              "pisces",
            ];
            handleChange(signs[activeSlideIndex]);
          }}
        >
          <SwiperSlide>
            <img src="../../images/ariesw.png" alt="Aries" />
            <p className="image-description">Aries.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/taurusw.png" alt="Taurus" />
            <p className="image-description">Taurus.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/geminiw.png" alt="Gemini" />
            <p className="image-description">Gemini.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/cancerw.png" alt="Cancer" />
            <p className="image-description">Cancer.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/leow.png" alt="Leo" />
            <p className="image-description">Leo.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/virgo1w.png" alt="Virgo" />
            <p className="image-description">Virgo.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/libraw.png" alt="Libra" />
            <p className="image-description">Libra.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/scorpiow.png" alt="Scorpio" />
            <p className="image-description">Scorpio.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/sagittariusw.png" alt="Sagittarius" />
            <p className="image-description">Sagittarius.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/capricornw.png" alt="Capricorn" />
            <p className="image-description">Capricorn.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/aquariusw.png" alt="Aquarius" />
            <p className="image-description">Aquarius.</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/piscesw.png" alt="Pisces" />
            <p className="image-description">Pisces.</p>
          </SwiperSlide>
        </Swiper>
        <br />
      </label>
    </form>
  );
}
