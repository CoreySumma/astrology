import axios from "axios";
import { updateRefinedPrediction } from "../actions";
import { gptPrompt2 } from "./gpt-prompt2";
import { awsAddPrediction } from "./aws-database-api";

export default async function gptApi2(
  signData,
  date,
  time,
  temp,
  location,
  dispatch,
  description,
  day,
  businessLocation,
  businessName,
  prediction
) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: gptPrompt2(
          signData,
          date,
          time,
          temp,
          description,
          location,
          day,
          businessLocation,
          businessName,
          prediction
        ),
        temperature: 0.6,
        max_tokens: 400,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    let refinedText = response.data.choices[0].text.trim();
    if (refinedText.startsWith("Refined Prediction:")) {
      refinedText = refinedText.replace("Refined Prediction:", "").trim();
    }
    dispatch(updateRefinedPrediction(refinedText));
    awsAddPrediction(refinedText, date);
    return refinedText;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
}
