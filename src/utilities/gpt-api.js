import axios from "axios";
import {
  updateRefinedPrediction,
  updatePrediction,
  updateFinalPrediction,
} from "../redux/actions/actions";
import gptApi2 from "./gpt-api2";
import gptApi3 from "./gpt-api3";
import gptPrompt from "./prompts/gpt-prompt";

export default async function gptApi(
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
          sign,
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
    const prediction = response.data.choices[0].text.trim();
    dispatch(updatePrediction(prediction));
    // 2nd API call to GPT
    const refinedPrediction = await gptApi2(
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
    );
    dispatch(updateRefinedPrediction(refinedPrediction));
    // Only proceed with the third call if userExists is true
    if (userExists && prevPrediction !== "No prediction available") {
      // The third agent is only needed to incorporare past predictions into the current one
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
    throw new Error(`Error in first OpenAI call: ${error.message}`);
  }
}
