import "./Prediction.css";
import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
// Library so gpt can return html tags
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
  fade,
  setFade,
  isButtonVisible,
  setIsButtonVisible,
  finalPrediction,
  setFinalPrediction,
  userExists,
  prevDateVisited,
  prevPrediction,
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
  // Object to grab constellation image based on current sign for loading animation based on loadingPrediction flag
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
  // Make a var to the current sign image
  const signImage = signImages[sign];
  // Make a var to the current constellation image
  const constellation = constellationImage[sign];

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
      // moonData !== null &&
      // moonData !== "" &&
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

  const dispatch = useDispatch();
  const [prediction, setPrediction] = useState("");
  // Grab the refined prediction from the store depending on if the user has visited before for front end display
  let refinedPrediction;
  const finalPredictionFirstVisit = useSelector(
    (store) => store.userData.refinedPrediction
  );
  const finalPredictionNotFirstVisit = useSelector(
    // (store) => store.userData.shortenedPrediction
    (store) => store.userData.finalPrediction
  );
  // Grab the refined(shortened) prediction from the store depending on if the user has visited before for front end display
  // Address's edge case of them refreshing the page and not having a prediction from last visit
  if (userExists && prevPrediction !== "No prediction available") {
    refinedPrediction = finalPredictionNotFirstVisit;
  } else {
    refinedPrediction = finalPredictionFirstVisit;
  }

  async function callGpt() {
    try {
      // Set loading flag on either end of the fetch call to GPT
      setLoadingPrediction(true);
      const result = await gptApi(
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
      setPrediction(result);
      setLoadingPrediction(false);
    } catch (error) {
      console.log("Error making call to gpt", error);
    }
  }

  async function handleClick() {
    // this is to prevent the button from being clicked before all data is fetched and to trigger the fade out animation
    if (allGptDataFetched) {
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
      type="button"
        onClick={handleClick}
        className={`prediction-button ${!isButtonVisible ? "fade-out" : ""}`}
      >
        Ask The Universe
      </button>
      <div className="prediction-container">
        {loadingPrediction && (
          <img className="loading-zodiac-sign" src={signImage} alt="Sign" />
        )}
        {!loadingPrediction && !allGptDataFetched && (
          <div className="spinner" />
        )}
        {!loadingPrediction && allGptDataFetched && refinedPrediction && (
          <div className="prediction-text-fade-in">
            {/* <img className="moon" src={moonData} alt="Moon Phase" /> */}
            <div className="constellation-container">
              <p className="display-sign">{sign}</p>
              <img
                className="constellation"
                src={constellation}
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
