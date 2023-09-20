import "./DayAtAGlance.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import gptApi from "../../utilities/gpt-api";
import { useEffect } from "react";

export default function DayAtAGlance({
  date,
  time,
  description,
  sign,
  temp,
  location,
  day,
  moonData,
  fade,
  setFade,
  isButtonVisible,
  setIsButtonVisible,
}) {
  // Flag to check if all data has been fetched to avoid GPT not having all data and loading animation
  const [allGptDataFetched, setAllGptDataFetched] = useState(false);

  useEffect(() => {
    if (
      temp !== null &&
      temp !== "" &&
      sign !== "" &&
      location !== "" &&
      day !== "" &&
      description !== "" &&
      date !== "" &&
      time !== "" &&
      moonData !== null &&
      moonData !== ""
    ) {
      setAllGptDataFetched(true);
    }
  }, [sign, temp, location, day, description, date, time, moonData]);

  const dispatch = useDispatch();
  const [prediction, setPrediction] = useState("");
  async function callGpt() {
    try {
      let result = await gptApi(
        sign,
        date,
        time,
        temp,
        location,
        dispatch,
        description,
        day
      );
      console.log(
        "this is the result from gptApi",
        result,
        "this is the values that were passed --->",
        sign,
        date,
        time,
        temp,
        location,
        description,
        day
      );
      setPrediction(result);
    } catch (error) {
      console.log("Error making call to gpt", error);
    }
  }

  async function handleClick() {
    // In case the user clicks the button before the data is loaded - this doesnt work as intended quite yet...
    if (allGptDataFetched === true) {
      callGpt();
      setTimeout(() => {
        setIsButtonVisible(false);
      }, 1000);
      setFade(true);
    } else {
      console.log("Waiting for data to load...Trying again in 1.5 seconds");
      setTimeout(callGpt, 2000);
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
        {!allGptDataFetched ? (
          <div className="spinner"></div>
        ) : prediction && moonData ? (
          <div className="prediction-text-fade-in">
            <img className="moon" src={moonData} alt="Moon Phase" />
            <p className="prediction-text">{prediction}</p>
          </div>
        ) : (
          <p className="prediction-text"></p>
        )}
      </div>
    </>
  );
}
