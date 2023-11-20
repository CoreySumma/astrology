export function gptPrompt3(
  prevPrediction,
  prevDateVisited,
  currentPrediction,
  date
) {

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
  As an Editor, minimally refine the Current Horoscope Prediction to subtly link it with the previous one, 
  acknowledging any shared insights and the passage of time in a creative way. 
  Ensure the edit feels like an ongoing conversation with the cosmos, 
  and maintain all HTML tags from the Current Horoscope Prediction - especially the <br /><br />.

  - Previous Horoscpoe Prediction: ${prevPrediction}.
  - Last Date Visited: ${prevDateVisited}.
  - Current Date: ${date}.
  - Current Horoscope Prediction: ${currentPrediction}.


  Your Checklist:
  1. MANDATORY: Keep all HTML tags from the Current Horoscope Prediction intact IMPORTANT: Especially the < br/>< br/> tags!
  2. Insert MINIMAL edits into the current prediction, subtly echoing any similar insights from the previous prediction.
  3. Do not explicitly state the dates of the predictions. Instead, use ${timePhrase} to creatively indicate the time elapsed.
  4. Ensure that your edit unifies both predictions, making them feel like parts of a larger celestial dialogue.
  5. The edit should feel like a natural continuation of the Current Horoscope Prediction, delicately acknowledging the ongoing journey.
  6. Focus on creative and fluent phrasing to weave past insights with present revelations, as if narrated by the heavens themselves.

  The aim is to craft an edit that enhances the sense of a continuous, evolving dialogue with the stars, respecting the passage of time and the journey of the reader.

    MANDATORY: Adhere to 'Your Checklist' precisely, and only make minimal edits to the current prediction keeping ALL HTML tags intact. Let me see your editorial prowess! Keep it as short as possible. Think step by step!
  `;
}

// 7. IMPORTANT: IF YOU ADD TO THE PREDICTION MAKE ADDITIONAL EDITS TO KEEP IT THE SAME LENGTH OR SHORTER.


