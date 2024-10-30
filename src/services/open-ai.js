import gptPrompt from "../prompts/gpt-prompt-1";
import gptPrompt2 from "../prompts/gpt-prompt-2";
import gptPrompt3 from "../prompts/gpt-prompt-3";
import { awsAddPrediction } from "./aws";
import { useGptApi, cleanUp } from "../utils/helpers";

export async function callFirstAgent(userData) {
  try {
    const prediction = await useGptApi(
      "gpt-3.5-turbo-instruct",
      gptPrompt(userData),
      0.7,
      280
    );
    return prediction;
  } catch (error) {
    throw new Error(`Error in first OpenAI call: ${error.message}`);
  }
}

export async function callSecondAgent(dispatch, prediction, userData) {
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

export async function callThirdAgent(refinedPrediction, userData) {
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
