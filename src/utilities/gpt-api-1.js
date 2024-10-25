import { updatePrediction } from "../redux/actions/actions";
import callSecondAgent from "./gpt-api-2";
import callThirdAgent from "./gpt-api-3";
import gptPrompt from "./prompts/gpt-prompt-1";
import { useGptApi } from "./helpers";
// All chained calls are made in this file
export default async function callFirstAgent(
  dispatch,
  userData
) {
  console.log("User data", userData);
  // 1st API call to GPT
  try {
    const prediction = await useGptApi(
      "gpt-3.5-turbo-instruct",
      gptPrompt(userData),
      0.7,
      280
    );
    // 2nd API call to GPT
    const refinedPrediction = await callSecondAgent(
      dispatch,
      prediction,
      userData
    );
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
        userData
      );
      dispatch(updatePrediction(finalPrediction));
    }
  } catch (error) {
    throw new Error(`Error in first OpenAI call: ${error.message}`);
  }
}
