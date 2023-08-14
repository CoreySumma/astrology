import axios from "axios";
import {gptPrompt} from "./gpt-prompt";

export default async function gptApi(signData, result, temp, location, time) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: {gptPrompt},
        temperature: 0.7,
        max_tokens: 100,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
}
