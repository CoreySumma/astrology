import "./DayAtAGlance.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import gptApi from "../../utilities/gpt-api";

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
  const dispatch = useDispatch();
  const [prediction, setPrediction] = useState("");

  async function handleClick() {
    // In case the user clicks the button before the data is loaded
    if ((time, temp, location, description, day, sign, date)) {
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
        console.log("this is the result from gptApi", result);
        setPrediction(result);
      } catch (error) {
        console.log("Error making call to gpt", error);
      }
    }
  }
  return (
    <>
      <button onClick={handleClick}>Ask The Stars...</button>
      <div className="prediction-container">
        <div className="video-background">
          <video playsInline autoPlay muted loop>
            <source src="/movies/starz.mp4" type="video/mp4" />
          </video>
        </div>
        {prediction ? (
          <>
            <p className="prediction-text prediction-text-fade-in">
              {prediction}
            </p>
            {moonData && (
              <div>
                <img className="moon" src={moonData} alt="Moon Phase" />
              </div>
            )}
          </>
        ) : (
          <p className="prediction-text">
            Please select your sign to see your prediction for today.
          </p>
        )}
      </div>
    </>
  );
}
