import "./DayAtAGlance.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gptApi from "../../utilities/gpt-api";

export default function DayAtAGlance({ sign, date, time, temp, location }) {
  const dispatch = useDispatch();
  const [prediction, setPrediction] = useState("");
  async function handleClick() {
    try {
      let result = await gptApi(sign, date, time, temp, location, dispatch);
      console.log("this is the result from gptApi", result);
      setPrediction(result);
    } catch (error) {
      console.log("Error making call to gpt", error);
    }
  }
  return (
    <>
      <button onClick={handleClick}>Ask The Stars...</button>
      <div className="prediction-container">
        {prediction ? (
          <p className="prediction-text">{prediction}</p>
        ) : (
          <p className="prediction-text">
            Please select your sign to see your prediction for today.
          </p>
        )}
      </div>
    </>
  );
}
