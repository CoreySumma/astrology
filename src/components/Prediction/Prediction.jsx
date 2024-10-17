import React, { useState, useEffect } from "react";
import "./Prediction.css";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import gptApi from "../../utilities/gpt-api";

export default function Prediction({
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
  setFade,
  isButtonVisible,
  setIsButtonVisible,
  userExists,
  prevDateVisited,
  prevPrediction,
}) {
  const dispatch = useDispatch();
  // Flag to check if all data has been fetched to avoid GPT not having all data and loading animation
  const [allGptDataFetched, setAllGptDataFetched] = useState(false);
  // Flag for flashing loading animation afetr button is pressed
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  // Map sign image based on current sign for loading animation based on loadingPrediction flag
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
  // Map constellation image based on current sign for loading animation
  const constellationImage = {
    aries: "../../images/aries-constellation.png",
    taurus: "../../images/taurus-constellation.png",
    gemini: "../../images/gemini-constellation.png",
    cancer: "../../images/cancer-constellation.png",
    leo: "../../images/leo-constellation.png",
    virgo: "../../images/virgo-constellation.png",
    libra: "../../images/libra-constellation.png",
    scorpio: "../../images/scorpio-constellation.png",
    sagittarius: "../../images/sagittarius-constellation.png",
    capricorn: "../../images/capricorn-constellation.png",
    aquarius: "../../images/aquarius-constellation.png",
    pisces: "../../images/pisces-constellation.png",
  };
  // Checks if all data has been fetched
  useEffect(() => {
    if (
      temp !== null &&
      temp !== "" &&
      location !== "" &&
      day !== "" &&
      description !== "" &&
      date !== "" &&
      time !== "" &&
      businessLocation !== "" &&
      businessName !== "" &&
      userExists !== ""
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
    userExists,
  ]);

  // Grab the refined prediction from the store depending on if the user has visited before for front end display
  const finalPredictionFirstVisit = useSelector(
    (store) => store.userData.refinedPrediction
  );
  const finalPredictionNotFirstVisit = useSelector(
    (store) => store.userData.finalPrediction
  );
  // Grab the refined(shortened) prediction from the store depending on if the user has visited before
  // Address's edge case of them refreshing the page and not having a prediction from last visit
  let refinedPrediction;
  if (userExists && prevPrediction !== "No prediction available") {
    refinedPrediction = finalPredictionNotFirstVisit;
  } else {
    refinedPrediction = finalPredictionFirstVisit;
  }

  async function callGpt() {
    try {
      // Set loading flag on either end of the fetch call to GPT
      setLoadingPrediction(true);
      await gptApi(
        sign,
        date,
        time,
        temp,
        location,
        dispatch,
        description,
        day,
        businessLocation,
        businessName,
        prevDateVisited,
        prevPrediction,
        userExists
      );
      setLoadingPrediction(false);
    } catch (error) {
      console.log("Error making call to gpt", error);
    }
  }

  async function handleClick() {
    if (allGptDataFetched) {
      callGpt();
      setIsButtonVisible(false);
      setFade(true);
    } else {
      setTimeout(() => {
        callGpt();
        setIsButtonVisible(false);
        setFade(true);
      }, 2000);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`prediction-button ${
          !isButtonVisible ? "fade-out" : allGptDataFetched && "slow-fade-in"
        }`}
      >
        Ask The Universe
      </button>
      <div className="prediction-container">
        {loadingPrediction && (
          <img
            className="loading-zodiac-sign"
            src={signImages[sign]}
            alt="Sign"
          />
        )}
        {!loadingPrediction && !allGptDataFetched && (
          <div className="spinner" />
        )}
        {!loadingPrediction && allGptDataFetched && refinedPrediction && (
          <div className="prediction-text-fade-in">
            <div className="constellation-container">
              <p className="display-sign">{sign}</p>
              <img
                className="constellation"
                src={constellationImage[sign]}
                alt="Constellation"
              />
              <p className="prediction-text">{parse(refinedPrediction)}</p>
            </div>
          </div>
        )}
        {!loadingPrediction && allGptDataFetched && !refinedPrediction && (
          <p className="prediction-text" />
        )}
      </div>
    </>
  );
}
