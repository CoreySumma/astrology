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
}) {
  // Flag to check if all data has been fetched to avoid GPT not having all data
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
    } else {
      console.log("Waiting for data to load...Trying again in 1.5 seconds");
      setTimeout(callGpt, 2000);
    }
  }
  return (
    <>
      <button onClick={handleClick}>Consult The Heavens...</button>
      <div className="prediction-container">
        <div className="video-background">
          <video
            autoPlay={true}
            controls=""
            playsInline
            muted
            loop
            preload="auto"
          >
            <source src="/movies/starz.mp4" type="video/mp4" />
          </video>
        </div>
        {!allGptDataFetched ? (
          <div className="spinner"></div>
        ) : prediction ? (
          <>
            <p className="prediction-text prediction-text-fade-in">
              {prediction}
            </p>
            {moonData && (
              <div>
                <img
                  className="moon prediction-text-fade-in"
                  src={moonData}
                  alt="Moon Phase"
                />
              </div>
            )}
          </>
        ) : (
          <p className="prediction-text prediction-text-fade-in">
            Please select a sign to see your prediction for today.
          </p>
        )}
      </div>
    </>
  );  
}
