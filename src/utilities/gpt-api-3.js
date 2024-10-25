import gptPrompt3 from "./prompts/gpt-prompt-3";
import { awsAddPrediction } from "./aws-database-api";
import { useGptApi, cleanUp } from "./helpers";

// eslint-disable-next-line consistent-return
export default async function callThirdAgent(
  prevPrediction,
  currentPrediction,
  prevDateVisited,
  date
) {
  try {
    const response = await useGptApi(
      "gpt-3.5-turbo-instruct",
      gptPrompt3(prevPrediction, prevDateVisited, currentPrediction, date),
      0.7,
      200
    );
    // If we call this fetch we need to update the last prediction in our database
    awsAddPrediction(response, date);
    return cleanUp(response);
  } catch (error) {
    throw new Error(`Error in third OpenAI call: ${error.message}`);
  }
}
