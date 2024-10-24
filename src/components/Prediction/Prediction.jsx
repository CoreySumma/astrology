import React, { useState } from "react";
import "./Prediction.css";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { useSnackbar } from "notistack";
import gptApi from "../../utilities/gpt-api-1";

export default function Prediction({
  temp,
  date,
  time,
  description,
  sign,
  location,
  day,
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
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const finalPredictionFirstVisit = useSelector(
    (store) => store.userData.refinedPrediction
  );
  const finalPredictionNotFirstVisit = useSelector(
    (store) => store.userData.finalPrediction
  );

  // Adjust the prediction based on whether the user has visited before
  const refinedPrediction =
    userExists && prevPrediction !== "No prediction available"
      ? finalPredictionNotFirstVisit
      : finalPredictionFirstVisit;

  const isDataLoading =
    temp === null ||
    location === "" ||
    day === "" ||
    description === "" ||
    date === "" ||
    time === "" ||
    businessLocation === "" ||
    businessName === "" ||
    userExists === "";

  async function callGpt() {
    try {
      setIsLoadingPrediction(true);
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
      setIsLoadingPrediction(false);
    } catch (error) {
      enqueueSnackbar(
        "The gods grow quiet...Check your API key or make a sacrafice.",
        { variant: "error" }
      );
    }
  }

  async function handleClick() {
    callGpt();
    setIsButtonVisible(false);
    setFade(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`prediction-button ${
          !isButtonVisible ? "fade-out" : !isDataLoading && "slow-fade-in"
        }`}
      >
        Ask The Universe
      </button>
      <div className="prediction-container">
        {isLoadingPrediction && (
          <img
            className="loading-zodiac-sign"
            src={`/images/${sign}w.png`}
            alt={`${sign} Sign`}
            data-testid="loading-prediction-icon"
          />
        )}
        {!isLoadingPrediction && isDataLoading && (
          <div data-testid="spinner" className="spinner" />
        )}
        {!isLoadingPrediction && !isDataLoading && refinedPrediction && (
          <div className="prediction-text-fade-in">
            <div className="constellation-container">
              <p className="display-sign">{sign}</p>
              <img
                className="constellation"
                src={`/images/${sign}-constellation.png`}
                alt={`${sign} Constellation`}
                data-testid="constellation"
              />
              <p className="prediction-text" data-testid="prediction">
                {parse(refinedPrediction)}
              </p>
            </div>
          </div>
        )}
        {!isLoadingPrediction && !isDataLoading && !refinedPrediction && (
          <p className="prediction-text" />
        )}
      </div>
    </>
  );
}
