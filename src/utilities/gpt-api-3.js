import gptPrompt3 from "./prompts/gpt-prompt-3";
import { awsAddPrediction } from "./aws-database-api";
import { useGptApi } from "./helpers";

// eslint-disable-next-line consistent-return
export default async function callThirdAgent(
  prevPrediction,
  currentPrediction,
  prevDateVisited,
  date
) {
  try {
    let response = await useGptApi(
      "gpt-3.5-turbo-instruct",
      gptPrompt3(prevPrediction, prevDateVisited, currentPrediction, date),
      0.7,
      200
    );
    const prefixes = [
      "Edited Prediction:",
      "Revised Prediction:",
      "Final Prediction:",
      "Updated Prediction:",
      "Your Refined Prediction:",
      "Your Final Prediction:",
      "Your Updated Prediction:",
    ];
    // Cleanup GPT mistakes
    response = response
      .replace(
        prefixes.find((prefix) => response.startsWith(prefix)) || "",
        ""
      )
      .trim();
    // If we call this fetch we need to update the last prediction in our database
    awsAddPrediction(response, date);
    return response;
  } catch (error) {
    throw new Error(`Error in third OpenAI call: ${error.message}`);
  }
}
