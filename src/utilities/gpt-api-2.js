import { updateRefinedPrediction } from "../redux/actions/actions";
import gptPrompt2 from "./prompts/gpt-prompt-2";
import { awsAddPrediction } from "./aws-database-api";
import { cleanUp, useGptApi } from "./helpers";

// eslint-disable-next-line consistent-return
export default async function callSecondAgent(
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
    const response = await useGptApi(
      "gpt-3.5-turbo-instruct",
      gptPrompt2(
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
      0.6,
      200
    );
    dispatch(updateRefinedPrediction(cleanUp(response)));
    awsAddPrediction(response, date);
    return response;
  } catch (error) {
    throw new Error(`Error in second OpenAI call: ${error.message}`);
  }
}
