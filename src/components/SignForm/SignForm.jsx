import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectFlip } from 'swiper/modules';
import SwiperCore from 'swiper/core';
import "./SignForm.css";
import { updateSign } from "../../actions";
import 'swiper/css/bundle';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFlip]);

export default function SignForm({ sign, setSign, fade, setFade }) {
  const [selectedSign, setSelectedSign] = useState("");
  const dispatch = useDispatch();
  // Redux line for retrieving data from the store for user's sign
  const signState = useSelector((state) => state.userData.signData);


// This is the original handleChange function for a selector
  // const handleChange = (e) => {
  //   const sign = e.target.value;
  //   setSelectedSign(sign);
  //   setSign(sign);
  //   dispatch(updateSign(sign));
  // };

  // This is the handleChange function for the swiper (new and improved UI) - Pick your poision
  const handleChange = (sign) => {
    setSelectedSign(sign);
    setSign(sign);
    dispatch(updateSign(sign));
  };
  
  return (
    <>
      <form className={"form-container " + (fade ? "fade-out" : "")}>
        <label>
          <p className="form-title">My zodiac sign is</p>
            <Swiper className="mySwiper"
              effect="flip"
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              // navigation
              onSlideChange={(swiper) => {
                // Save the index of the active slide through swiper
                const activeSlideIndex = swiper.activeIndex;
                // Create an array of the signs correlating to the index of the slide
                const signs = [
                  "aries", "taurus", "gemini", "cancer", 
                  "leo", "virgo", "libra", "scorpio", 
                  "sagittarius", "capricorn", "aquarius", "pisces"
                ];
                // Call the handleChange function with the sign correlating to the active slide index
                handleChange(signs[activeSlideIndex]);
              }
            }
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
            < br/>
        </label>
      </form>
    </>


// This is the original selector
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
