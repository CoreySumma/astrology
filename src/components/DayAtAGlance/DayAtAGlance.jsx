import "./DayAtAGlance.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gptApi from "../../utilities/gpt-api";
import { useEffect } from "react";
// Library so gpt can return html tags
import parse from "html-react-parser";

export default function DayAtAGlance({
  date,
  time,
  description,
  sign,
  temp,
  location,
  day,
  moonData,
  businessLocation,
  businessName,
  fade,
  setFade,
  isButtonVisible,
  setIsButtonVisible,
}) {
  // Flag to check if all data has been fetched to avoid GPT not having all data and loading animation
  const [allGptDataFetched, setAllGptDataFetched] = useState(false);
  // Flag for flashing loading animation
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  // Object to grab sign image based on current sign for loading animation based on loadingPrediction flag
  const signImages = {
    aries: "../../images/ariesw.png",
    taurus: "../../images/taurusw.png",
    gemini: "../../images/geminiw.png",
    cancer: "../../images/cancerw.png",
    leo: "../../images/leow.png",
    virgo: "../../images/virgo1w.png",
    libra: "../../images/libraw.png",
    scorpio: "../../images/scorpiow.png",
    sagittarius: "../../images/sagittariusw.png",
    capricorn: "../../images/capricornw.png",
    aquarius: "../../images/aquariusw.png",
    pisces: "../../images/piscesw.png",
  };
  const constellationImage = {
    aries: "../../images/aries-constellation.png",
  }
  // Make a var to the current sign image
  let signImage = signImages[sign];
  // Make a var to the current constellation image
  let constellation = constellationImage[sign];

  // This useEffect checks if all data has been fetched and sets the flag to true
  useEffect(() => {
    if (
      temp !== null &&
      temp !== "" &&
      location !== "" &&
      day !== "" &&
      description !== "" &&
      date !== "" &&
      time !== "" &&
      moonData !== null &&
      moonData !== "" &&
      businessLocation !== "" &&
      businessName !== ""
    ) {
      setAllGptDataFetched(true);
    }
  }, [
    sign,
    temp,
    location,
    day,
    description,
    date,
    time,
    moonData,
    businessLocation,
    businessName,
  ]);

  const dispatch = useDispatch();
  const [prediction, setPrediction] = useState("");
  // Grab the refined prediction from the store
  let refinedPrediction = useSelector(
    (store) => store.userData.refinedPrediction
  );

  async function callGpt() {
    try {
      // Set loading flag on either end of the fetch call to GPT
      setLoadingPrediction(true);
      let result = await gptApi(
        sign,
        date,
        time,
        temp,
        location,
        dispatch,
        description,
        day,
        businessLocation,
        businessName
      );
      setPrediction(result);
      setLoadingPrediction(false);
    } catch (error) {
      console.log("Error making call to gpt", error);
    }
  }

  async function handleClick() {
    // this is to prevent the button from being clicked before all data is fetched and to trigger the fade out animation
    if (allGptDataFetched === true) {
      callGpt();
      setIsButtonVisible(false);
      setFade(true);
    } else {
      // This doesn't work...yet
      setTimeout(() => {
        console.log(
          "Waiting for data to be fetched...Trying again in 2 seconds."
        );
        callGpt();
        setIsButtonVisible(false);
        setFade(true);
      }, 2000);
    }
  }
  return (
    <>
      <button
        onClick={handleClick}
        className={!isButtonVisible ? "fade-out" : ""}
      >
        Ask The Universe
      </button>
      <div className="prediction-container">
        {loadingPrediction ? (
          <img className="loading-zodiac-sign" src={signImage} alt="Sign" />
        ) : !allGptDataFetched ? (
          <div className="spinner"></div>
        ) : moonData && refinedPrediction ? (
          <div className="prediction-text-fade-in">
            {/* <img className="moon" src={moonData} alt="Moon Phase" /> */}
            <img className="constellation" src={constellation} alt="Constellation" />
            <p className="prediction-text">{parse(refinedPrediction)}</p>
          </div>
        ) : (
          <p className="prediction-text"></p>
        )}
      </div>
    </>
  );
}
