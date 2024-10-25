import React, { useState } from "react";
import "./Prediction.css";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import gptApi from "../../utilities/gpt-api-1";
import useUserData from "../../redux/selectors/userDataSelector";

export default function Prediction({
  date,
  sign,
  setFade,
  isButtonVisible,
  setIsButtonVisible,
}) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  // We use Redux for complex state/data management because it needs to
  // be shared back and fourth between calls/components
  const {
    description,
    temp,
    location,
    businessName,
    businessLocation,
    userExists,
    prevDateVisited,
    prevPrediction,
    refinedPrediction,
    finalPrediction,
  } = useUserData();
  const time = dayjs().format("hh:mm A");
  const day = dayjs().format("dddd");

  // Adjust the prediction based on whether the user has visited before
  // final prediction does not exist on first visit
  // TODO change naming convention for final prediction/refined
  const prediction =
    userExists && prevPrediction !== "No prediction available"
      ? finalPrediction
      : refinedPrediction;

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

  async function callAgents() {
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
        "The gods grow quiet...Maybe you should make a sacrafice?",
        { variant: "error" }
      );
    }
  }

  async function handleClick() {
    callAgents();
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
        {!isLoadingPrediction && !isDataLoading && prediction && (
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
                {parse(prediction)}
              </p>
            </div>
          </div>
        )}
        {!isLoadingPrediction && !isDataLoading && !prediction && (
          <p className="prediction-text" />
        )}
      </div>
    </>
  );
}
