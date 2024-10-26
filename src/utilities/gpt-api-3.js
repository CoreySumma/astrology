import gptPrompt3 from "./prompts/gpt-prompt-3";
import { awsAddPrediction } from "./aws-database-api";
import { useGptApi, cleanUp } from "./helpers";

export default async function callThirdAgent(
  refinedPrediction,
  userData
) {
  try {
    const response = await useGptApi(
      "gpt-3.5-turbo-instruct",
      gptPrompt3(refinedPrediction, userData),
      0.7,
      280
    );
    // If we call this fetch we need to update the last prediction in our database
    awsAddPrediction(response, userData.date);
    return cleanUp(response);
  } catch (error) {
    throw new Error(`Error in third OpenAI call: ${error.message}`);
  }
}
