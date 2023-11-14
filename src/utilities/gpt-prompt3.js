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

  // Explicitly stating that the output should only include the edits
  return `
    As an Editor, your task is to subtly integrate the essence of a previous horoscope prediction into the current prediction. 
    IMPORTANT: You very small adjustment to the current prediction that acknowledges the previous advice, while preserving all original HTML formatting. Do not add any prefix or extra text; only include the necessary edit itself.

    - Previous Prediction: ${prevPrediction}
    - Last Date Visited: ${prevDateVisited}
    - Current Date: ${date}
    - Current prediction to be refined: ${currentPrediction}

    Your Checklist:
    1. Keep all HTML tags from the previous and current predictions intact.
    2. Insert a single, minimal edit into the current prediction to subtly reflect the continuity from the previous prediction.
    3. Do not use the exact date of the last prediction in your edit. 
    4. If the current date is the same as the previous one, gently hint at the day's ongoing narrative in a creative way (e.g., "As the day unfolds, ..."). If the dates are different, subtly imply the passage of time (e.g., "With the wisdom gained since our last celestial encounter, ...")
    5. The edit should feel like a natural part of the current prediction, with just a whisper of recognition of the previous insights.
    6. Use creative phrasing to fluently weave the past prediction with the present as if a conversation with the heavens is occuring.

    The edited content should read as a natural continuation of the user's astrological narrative, acknowledging previous advice subtly within the current context. It is crucial that the output contains only the edit itself and seamlessly integrates into the existing prediction.

    MANDATORY: Adhere to 'Your Checklist' precisely, and only small edits to the current prediction. Let me see your editorial prowess!
  `;
}


// Your Checklist:
// 1. Keep all HTML tags from the previous and current predictions intact.
// 2. Insert one minimal, seamless edit into the current prediction to create a link with the previous prediction.
// 3. Do not use the exact date of the last prediction in your edit. Instead, imply the passage of time or continuity creatively.
// 4. Try to use phrases that imply you have a sense of time since the last prediciton in saying things like "Earlier toda
//  when the heavens spoke to you" or "A few days ago when the gods gave you insight", or 
//  "Earlier this month" - Make sure it's relivant to the date of last prediction and the date today.