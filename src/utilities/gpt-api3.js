import axios from "axios";
import gptPrompt3 from "./prompts/gpt-prompt3";
import { awsAddPrediction } from "./aws-database-api";

// eslint-disable-next-line consistent-return
export default async function gptApi3(
  prevPrediction,
  currentPrediction,
  prevDateVisited,
  date
) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt: gptPrompt3(
          prevPrediction,
          prevDateVisited,
          currentPrediction,
          date
        ),
        temperature: 0.7,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    let finalPrediction = response.data.choices[0].text.trim();
    const prefixes = [
      "Edited Prediction:",
      "Revised Prediction:",
      "Final Prediction:",
      "Updated Prediction:",
      "Your Refined Prediction:",
      "Your Final Prediction:",
      "Your Updated Prediction:"
    ];
    // Cleanup GPT mistakes
    finalPrediction = finalPrediction.replace(
      prefixes.find(prefix => finalPrediction.startsWith(prefix)) || '', 
      ''
    ).trim();
    // If we call this fetch we need to update the last prediction in our database
    awsAddPrediction(finalPrediction, date);
    return finalPrediction;
  } catch (error) {
    throw new Error(`Error in third OpenAI call: ${error.message}`);
  }
}
