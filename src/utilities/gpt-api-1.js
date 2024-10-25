import { updatePrediction } from "../redux/actions/actions";
import callSecondAgent from "./gpt-api-2";
import callThirdAgent from "./gpt-api-3";
import gptPrompt from "./prompts/gpt-prompt-1";
import { useGptApi } from "./helpers";
// All chained calls are made in this file
export default async function callFirstAgent(
  sign,
  date,
  time,
  dispatch,
  day,
  userData
) {
  console.log("User data", userData);
  // 1st API call to GPT
  try {
    const prediction = await useGptApi(
      "gpt-3.5-turbo-instruct",
      gptPrompt(sign, date, time, day, userData),
      0.7,
      280
    );
    console.log("First prediction", prediction);
    // 2nd API call to GPT
    const refinedPrediction = await callSecondAgent(
      sign,
      date,
      time,
      dispatch,
      day,
      prediction,
      userData
    );
    console.log("Second prediction", refinedPrediction);
    dispatch(updatePrediction(refinedPrediction));
    // Only proceed with the third call if userExists and they have a previous prediction
    if (
      userData.userExists &&
      userData.prevPrediction !== "No prediction available"
    ) {
      // The third agent is only needed to incorporare past predictions into the current one
      console.log("Nice to see you again");
      const finalPrediction = await callThirdAgent(
        refinedPrediction,
        date,
        userData
      );
      console.log("Final prediction", finalPrediction);
      dispatch(updatePrediction(finalPrediction));
    }
  } catch (error) {
    throw new Error(`Error in first OpenAI call: ${error.message}`);
  }
}
