import axios from "axios";

export async function useGptApi(model, prompt, temperature, maxTokens) {
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model,
      prompt,
      temperature,
      max_tokens: maxTokens,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.choices[0].text.trim();
}

export async function getUserIp() {
  try {
    const { data } = await axios.get("https://api64.ipify.org?format=json");
    return data.ip;
  } catch (error) {
    throw new Error(`Could not get user IP${error.message}`);
  }
}

export function cleanUp(text) {
  const prefixes = [
    "Edited Prediction:",
    "Revised Prediction:",
    "Final Prediction:",
    "Updated Prediction:",
    "Your Refined Prediction:",
    "Your Final Prediction:",
    "Your Updated Prediction:",
    "Your Refinement:",
  ];
  return text
    .replace(prefixes.find((prefix) => text.startsWith(prefix)) || "", "")
    .trim();
}

export async function useAwsApi(date, prediction = "") {
  const ipAddress = await getUserIp();
  // endpoint reacts differently if we send a prediction
  // build the payload accordingly
  const payload = prediction
    ? { prediction, ipAddress, date }
    : { ipAddress, date };
  return axios.post(
    "https://mfx5wug1gl.execute-api.us-east-2.amazonaws.com/default/checkAndSave",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
