import "./DayAtAGlance.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gptApi from "../../utilities/gpt-api";

export default function DayAtAGlance({
  data,
  date,
  time,
  description,
  sign,
  temp,
  location,
  day,
  moonData
}) {
  const dispatch = useDispatch();
  const [prediction, setPrediction] = useState("");

  async function handleClick() {
    try {
      let result = await gptApi(
        sign,
        date,
        time,
        temp,
        location,
        dispatch,
        description,
        location,
        day
      );
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
      <>
        <p className="prediction-text prediction-text-fade-in">{prediction}</p>
        {moonData && <div><img src={moonData} alt="Moon Phase" /></div>}
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
