import axios from "axios";
import gptPrompt4 from "./gpt-prompt4";

// eslint-disable-next-line consistent-return
export default async function gptApi4(prediction) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt: gptPrompt4(prediction),
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
    let shortenedPrediction = response.data.choices[0].text.trim();
    if (shortenedPrediction.startsWith("Shortened Prediction:")) {
      shortenedPrediction = shortenedPrediction
        .replace(
          "Shortened Prediction:" ||
            "Revised Prediction:" ||
            "Final Prediction:",
          ""
        )
        .trim();
    }
    return shortenedPrediction;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
}
