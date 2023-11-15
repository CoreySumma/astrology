export function gptPrompt3(
  prevPrediction,
  prevDateVisited,
  currentPrediction,
  date
) {
  console.log("prev pred", prevPrediction);
  console.log("prev date", prevDateVisited);
  console.log("date", date);
  console.log("current prediction", currentPrediction);

// Function to parse dates in MM/DD/YYYY format
const parseDate = (dateString) => {
  const [month, day, year] = dateString.split('/').map(num => parseInt(num, 10));
  return new Date(year, month - 1, day);
};

const lastVisit = parseDate(prevDateVisited);
const currentDate = parseDate(date);

// Debugging: Log parsed dates
console.log('Parsed Last Visit:', lastVisit);
console.log('Parsed Current Date:', currentDate);

// Calculate time difference in days
const timeDiff = Math.round((currentDate - lastVisit) / (1000 * 60 * 60 * 24));

// Debugging: Log time difference
console.log('Time Difference (days):', timeDiff);

let timePhrase;
if (timeDiff === 0) {
  timePhrase = "As today's celestial story continues,";
} else if (timeDiff < 7) {
  timePhrase = "In the days since the stars last whispered,";
} else {
  timePhrase = "As the weeks under the heavens have passed,";
}


  // Explicitly stating that the output should only include the edits
  return `
  As an Editor, refine the current horoscope prediction to subtly link it with the previous one, acknowledging any shared insights and the passage of time in a creative way. Ensure the edit feels like an ongoing conversation with the cosmos, and maintain all original HTML formatting.

  - Previous Prediction: ${prevPrediction}
  - Last Date Visited: ${prevDateVisited}
  - Current Date: ${date}
  - Current prediction to be refined: ${currentPrediction}

  Your Checklist:
  1. MANDATORY: Keep all HTML tags from the previous and current predictions intact.
  2. Insert minimal edits into the current prediction, subtly echoing any similar insights from the previous prediction.
  3. Do not explicitly state the dates of the predictions. Instead, use ${timePhrase} to creatively indicate the time elapsed.
  4. Ensure that your edit unifies both predictions, making them feel like parts of a larger celestial dialogue.
  5. The edit should feel like a natural continuation of the current prediction, delicately acknowledging the ongoing journey.
  6. Focus on creative and fluent phrasing to weave past insights with present revelations, as if narrated by the heavens themselves.

  The aim is to craft an edit that enhances the sense of a continuous, evolving dialogue with the stars, respecting the passage of time and the journey of the reader.

    MANDATORY: Adhere to 'Your Checklist' precisely, and only small edits to the current prediction. Let me see your editorial prowess - Don't forget the HTML tags!
  `;
}

// Your Checklist:
// 1. Keep all HTML tags from the previous and current predictions intact.
// 2. Insert one minimal, seamless edit into the current prediction to create a link with the previous prediction.
// 3. Do not use the exact date of the last prediction in your edit. Instead, imply the passage of time or continuity creatively.
// 4. Try to use phrases that imply you have a sense of time since the last prediciton in saying things like "Earlier toda
//  when the heavens spoke to you" or "A few days ago when the gods gave you insight", or
//  "Earlier this month" - Make sure it's relivant to the date of last prediction and the date today.
