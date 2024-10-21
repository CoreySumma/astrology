import dayjs from "dayjs";

export default function gptPrompt3(
  prevPrediction,
  prevDateVisited,
  currentPrediction,
  date
) {

  // Calculate how many days since last prediction
  const timeDiff = dayjs(date, "MM-DD-YYYY").diff(
    dayjs(prevDateVisited, "MM-DD-YYYY"), 
    "day"
  );

  const timePhrase = 
  // eslint-disable-next-line no-nested-ternary
  timeDiff === 0 
    ? "As today's celestial story continues," 
    : timeDiff < 7 
      ? "In the days since the stars last whispered," 
      : "As the weeks under the heavens have passed,";

  return `
  As an Editor, refine the current horoscope prediction to subtly link it with the previous one, 
  acknowledging any shared insights and the passage of time in a creative way. 
  Ensure the edit feels like an ongoing conversation with the cosmos, and maintain all original HTML formatting.
  Focus on minimal edits and keeping the horoscope as short as possible while maintaining its impact.

  - Previous Prediction: ${prevPrediction}
  - Last Date Visited: ${prevDateVisited}
  - Current Date: ${date}
  - Current prediction to be refined: ${currentPrediction}

  Your Checklist:
  1. MANDATORY: Keep all HTML tags from the previous and current predictions intact - Especially the <br /> <br /> before the last sentence.
  2. Insert minimal edits into the current prediction, subtly echoing any similar insights from the previous prediction.
  3. Do not explicitly state the dates of the predictions. Instead, use ${timePhrase} to creatively indicate the time elapsed.
  4. Ensure that your edit unifies both predictions, making them feel like parts of a larger celestial dialogue.
  5. The edit should feel like a natural continuation of the current prediction, delicately acknowledging the ongoing journey.
  6. Focus on creative and fluent phrasing to weave past insights with present revelations, as if narrated by the heavens themselves while keeping it as short as possible(250 characters).

  The aim is to craft an edit that enhances the sense of a continuous, evolving dialogue with the stars, respecting the passage of time and the journey of the reader.

    MANDATORY: Adhere to 'Your Checklist' precisely, and only small edits to the current prediction. Let me see your editorial prowess - DON'T FORGET TO KEEP ALL THE HTML TAGS!
  `;
}
