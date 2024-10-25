import gptPrompt2 from "./prompts/gpt-prompt-2";
import { awsAddPrediction } from "./aws-database-api";
import { useGptApi, cleanUp } from "./helpers";

// eslint-disable-next-line consistent-return
export default async function callSecondAgent(
  dispatch,
  prediction,
  userData
) {
  try {
    const response = await useGptApi(
      "gpt-3.5-turbo-instruct",
      gptPrompt2(prediction, userData),
      0.6,
      280
    );
    awsAddPrediction(response, userData.date);
    return cleanUp(response);
  } catch (error) {
    throw new Error(`Error in second OpenAI call: ${error.message}`);
  }
}
