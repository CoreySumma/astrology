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
  businessLocation,
  businessName,
  fade,
  setFade,
  isButtonVisible,
  setIsButtonVisible,
}) {
  // Flag to check if all data has been fetched to avoid GPT not having all data and loading animation
  const [allGptDataFetched, setAllGptDataFetched] = useState(false);

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
  }, [sign, temp, location, day, description, date, time, moonData, businessLocation, businessName]);

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
        day,
        businessLocation,
        businessName
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
    // this is to prevent the button from being clicked before all data is fetched and to trigger the fade out animation
    if (allGptDataFetched === true) {
      callGpt();
      setIsButtonVisible(false);
      setFade(true);
    } else {
      // This doesn't work...yet
      setTimeout(() => {
        console.log("Waiting for data to be fetched...Trying again in 2 seconds.")
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
        {!allGptDataFetched ? (
          <div className="spinner"></div>
        ) : moonData && prediction ? (
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
