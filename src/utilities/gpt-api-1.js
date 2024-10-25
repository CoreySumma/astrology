import {
  updateRefinedPrediction,
  updatePrediction,
  updateFinalPrediction,
} from "../redux/actions/actions";
import callSecondAgent from "./gpt-api-2";
import callThirdAgent from "./gpt-api-3"; 
import gptPrompt from "./prompts/gpt-prompt-1";
import { useGptApi } from "./helpers";
// All chained calls are made in this file
export default async function callFirstAgent(
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
) {
  // 1st API call to GPT
  try {
    const prediction = await useGptApi(
      "gpt-3.5-turbo-instruct",
      gptPrompt(
        sign,
        date,
        time,
        temp,
        description,
        location,
        day,
        businessLocation,
        businessName
      ),
      0.7,
      200
    );
    ;
    dispatch(updatePrediction(prediction));
    // 2nd API call to GPT
    const refinedPrediction = await callSecondAgent(
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
      prediction
    );
    dispatch(updateRefinedPrediction(refinedPrediction));
    // Only proceed with the third call if userExists and they have a previous prediction
    if (userExists && prevPrediction !== "No prediction available") {
      // The third agent is only needed to incorporare past predictions into the current one
      console.log("Nice to see you again");
      const finalPrediction = await callThirdAgent(
        prevPrediction,
        refinedPrediction,
        prevDateVisited,
        date
      );
      dispatch(updateFinalPrediction(finalPrediction));
    }
  } catch (error) {
    throw new Error(`Error in first OpenAI call: ${error.message}`);
  }
}
