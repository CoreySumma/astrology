import axios from "axios";
import { gptPrompt3 } from "./gpt-prompt3";
import { awsAddPrediction } from "./aws-database-api";

export default async function gptApi3(
  prevPrediction,
  currentPrediction,
  prevDateVisited,
  date,
) {

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: gptPrompt3(
          prevPrediction,
          prevDateVisited,
          currentPrediction,
          date,
        ),
        temperature: 0.7,
        max_tokens: 400,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    let finalPrediction = response.data.choices[0].text.trim();
    const prefix = "Edited Prediction:" || "Revised Prediction:" || "Final Prediction:";
    if (finalPrediction.startsWith(prefix)) {
      finalPrediction = finalPrediction.substring(prefix.length).trim();
    }
    // If we call this fetch we need to update the last prediction in our database
    // awsAddPrediction(finalPrediction, date);
    console.log(date);
    return finalPrediction;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
}
