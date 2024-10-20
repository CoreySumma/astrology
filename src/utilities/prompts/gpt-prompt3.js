export default function gptPrompt3(
  prevPrediction,
  prevDateVisited,
  currentPrediction,
  date
) {
  // Function to parse dates in MM/DD/YYYY format
  const parseDate = (dateString) => {
    const [month, day, year] = dateString
      .split("/")
      .map((num) => parseInt(num, 10));
    return new Date(year, month - 1, day);
  };

  const lastVisit = parseDate(prevDateVisited);
  const currentDate = parseDate(date);

  // Calculate time difference in days
  const timeDiff = Math.round(
    (currentDate - lastVisit) / (1000 * 60 * 60 * 24)
  );

  let timePhrase;
  if (timeDiff === 0) {
    timePhrase = "As today's celestial story continues,";
  } else if (timeDiff < 7) {
    timePhrase = "In the days since the stars last whispered,";
  } else {
    timePhrase = "As the weeks under the heavens have passed,";
  }

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
  6. Focus on creative and fluent phrasing to weave past insights with present revelations, as if narrated by the heavens themselves while keeping it as short as possible.

  The aim is to craft an edit that enhances the sense of a continuous, evolving dialogue with the stars, respecting the passage of time and the journey of the reader.

    MANDATORY: Adhere to 'Your Checklist' precisely, and only small edits to the current prediction. Let me see your editorial prowess - DON'T FORGET TO KEEP ALL THE HTML TAGS!
  `;
}
