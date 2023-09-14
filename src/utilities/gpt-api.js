import axios from "axios";
import { updatePrediction } from "../actions";
import { gptPrompt } from "./gpt-prompt";

export default async function gptApi(
  signData,
  date,
  time,
  temp,
  location,
  dispatch,
  description,
  day
) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: gptPrompt(signData, date, time, temp, description, location, day),
        temperature: 0.8,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(updatePrediction(response.data.choices[0].text.trim()));
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
}
