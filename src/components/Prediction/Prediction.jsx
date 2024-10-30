import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useMediaQuery, useTheme } from "@mui/material";
import "./Prediction.css";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import { useSnackbar } from "notistack";
import callAllAgents from "../../services/callAllAgents";
import useUserData from "../../redux/selectors/userDataSelector";

export default function Prediction({ setFade }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const userData = useUserData();

  const {
    temp,
    location,
    description,
    businessLocation,
    businessName,
    userExists,
    prediction,
    date,
    time,
    day,
    sign,
  } = userData;

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("sm"));

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

  async function getPrediction() {
    try {
      setIsLoadingPrediction(true);
      await callAllAgents(dispatch, userData);
      setIsLoadingPrediction(false);
    } catch (error) {
      enqueueSnackbar(
        `The Gods grow quiet...Maybe you should make a sacrafice? ${error.message}`,
        { variant: "error" }
      );
    }
  }

  async function handleClick() {
    getPrediction();
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
            src={`/images/${sign.toLowerCase()}w.png`}
            alt={`${sign} Sign`}
            data-testid="loading-prediction-icon"
          />
        )}
        {!isLoadingPrediction && isDataLoading && (
          <CircularProgress
            sx={{
              color: "grey",
              mt: isSM ? "40px" : "85px",
              zIndex: 1,
            }}
            size="3rem"
            thickness={4}
            data-testid="spinner"
          />
        )}
        {!isLoadingPrediction && !isDataLoading && prediction && (
          <div className="prediction-text-fade-in">
            <div className="constellation-container">
              <p className="display-sign">{sign}</p>
              <img
                className="constellation"
                src={`/images/${sign.toLowerCase()}-constellation.png`}
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
