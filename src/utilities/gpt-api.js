import axios from "axios";

export default async function gptApi(signData, Result) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `You are playing the part of a Fortune Teller for the user.  Please give a day at a glance using all information you have for today for this Astrological sign ${signData}. Please make it as accurate as you can with what you know about this sign and the day the user is requesting the prediction for.  Be concise, inspirational, blunt, and do not beat around the bush.  After you give the prediction, tell the user steps they need to take for the day that relates to the prediction in terms of what they should be doing or a mindxset they should have.  Do not mention your objective in the response as this is an interactive app and the user should just be impressed by your wisdom.`,
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
