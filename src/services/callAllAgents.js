import { updatePrediction } from "../redux/actions/actions";
import { callFirstAgent, callSecondAgent, callThirdAgent } from "./open-ai";

// All chained calls are made in this file
export default async function callAllAgents(dispatch, userData) {
  try {
    // 1st API call to GPT
    const prediction = await callFirstAgent(userData);
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
      const finalPrediction = await callThirdAgent(refinedPrediction, userData);
      dispatch(updatePrediction(finalPrediction));
    }
  } catch (error) {
    throw new Error(`Error in first OpenAI call: ${error.message}`);
  }
}
