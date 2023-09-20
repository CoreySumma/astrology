import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectFlip } from 'swiper/modules';
import SwiperCore from 'swiper/core';
import "./SignForm.css";
import { updateSign } from "../../actions";
import 'swiper/css/bundle';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFlip]);

export default function SignForm({ sign, setSign }) {
  const [selectedSign, setSelectedSign] = useState("");
  const dispatch = useDispatch();
  // Redux line for retrieving data from the store for user's sign
  const signState = useSelector((state) => state.userData.signData);

  // const handleChange = (e) => {
  //   const sign = e.target.value;
  //   setSelectedSign(sign);
  //   setSign(sign);
  //   dispatch(updateSign(sign));
  // };

  const handleChange = (sign) => {
    setSelectedSign(sign);
    setSign(sign);
    dispatch(updateSign(sign));
  };
  

  return (
    <>
      <form className="form-container">
        <label>
          {/* Select your zodiac sign: */}
          <br />
            <Swiper className="mySwiper"
              effect="flip"
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              // navigation
            //   onSlideChange={(swiper) => {
            //     const activeSlideIndex = swiper.activeIndex;
            //     const signs = [
            //       "aries", "taurus", "gemini", "cancer", 
            //       "leo", "virgo", "libra", "scorpio", 
            //       "sagittarius", "capricorn", "aquarius", "pisces"
            //     ];
            //     handleChange(signs[activeSlideIndex]);
            //   }
            // }
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <img src="../../images/aries.png" alt="Aries" />
                <p>Aries</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/taurus.png" alt="Taurus" />
                <p>Taurus</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/gemini.png" alt="Gemini" />
                <p>Gemini</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/cancer.png" alt="Cancer" />
                <p>Cancer</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/leo.png" alt="Leo" />
                <p>Leo</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/virgo1.png" alt="Virgo" />
                <p>Virgo</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/libra.png" alt="Libra" />
                <p>Libra</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/scorpio.png" alt="Scorpio" />
                <p>Scorpio</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/sagittarius.png" alt="Sagittarius" />
                <p>Sagittarius</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/capricorn.png" alt="Capricorn" />
                <p>Capricorn</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/aquarius.png" alt="Aquarius" />
                <p>Aquarius</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../images/pisces.png" alt="Pisces" />
                <p>Pisces</p>
              </SwiperSlide>
            </Swiper>
            < br/>
            {/* <hr /> */}
        </label>
      </form>
    </>

    // <>
    //   <form className="form-container">
    //     <label>
    //       Select your zodiac sign:
    //       <br />
    //       <div className="selector">
    //         <select
    //           value={selectedSign}
    //           onChange={handleChange}
    //           className="selector"
    //         >
    //           <option value="">My Sign Is...</option>
    //           <option value="aries">Aries</option>
    //           <option value="taurus">Taurus</option>
    //           <option value="gemini">Gemini</option>
    //           <option value="cancer">Cancer</option>
    //           <option value="leo">Leo</option>
    //           <option value="virgo">Virgo</option>
    //           <option value="libra">Libra</option>
    //           <option value="scorpio">Scorpio</option>
    //           <option value="sagittarius">Sagittarius</option>
    //           <option value="capricorn">Capricorn</option>
    //           <option value="aquarius">Aquarius</option>
    //           <option value="Pisces">Pisces</option>
    //         </select>
    //         <hr />
    //       </div>
    //     </label>
    //   </form>
    // </>
  );
}
