import axios from "axios";
import {
  updateRefinedPrediction,
  updatePrediction,
  updateFinalPrediction,
} from "../actions";
import gptApi2 from "./gpt-api2";
import gptApi3 from "./gpt-api3";
import gptPrompt from "./prompts/gpt-prompt";

export default async function gptApi(
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
  prevDateVisited,
  prevPrediction,
  userExists
) {
  // 1st API call to GPT
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt: gptPrompt(
          signData,
          date,
          time,
          temp,
          description,
          location,
          day,
          businessLocation,
          businessName
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
    // Set prediction to variable to pass to second call
    const prediction = response.data.choices[0].text.trim();
    // Update Redux store with first prediction
    dispatch(updatePrediction(prediction));
    // 2nd API call to GPT
    const refinedPrediction = await gptApi2(
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
    );
    // Save the refined version
    dispatch(updateRefinedPrediction(refinedPrediction));
    // Only proceed with the third call if userExists is true
    if (userExists && prevPrediction !== "No prediction available") {
      console.log("User exists, calling third API...");
      const finalPrediction = await gptApi3(
        prevPrediction,
        refinedPrediction,
        prevDateVisited,
        date
      );
      dispatch(updateFinalPrediction(finalPrediction));
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
}
