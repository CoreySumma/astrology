import axios from "axios";
import { updateRefinedPrediction } from "../redux/actions/actions";
import gptPrompt2 from "./prompts/gpt-prompt2";
import { awsAddPrediction } from "./aws-database-api";

// eslint-disable-next-line consistent-return
export default async function gptApi2(
  sign,
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
        model: "gpt-3.5-turbo-instruct",
        prompt: gptPrompt2(
          sign,
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
        max_tokens: 200,
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
    throw new Error(`Error in second OpenAI call: ${error.message}`);
  }
}
