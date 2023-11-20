export function gptPrompt4(prediction) {


  // Explicitly stating that the output should only include the edits
  return `
  As the final AI assistant you are tasked with making edits to a horoscope prediction right before the user see's it.

  Your Checklist:
  1. MANDATORY: Keep all HTML tags from the Current Horoscope Prediction intact IMPORTANT: Especially the < br/>< br/> tags!
  2. Shorten the prediction to around 350 characters.
  3. Make sure to leave the most impactful parts of the prediction intact including but not limited to any atmospheric hints or specifics.

  Here is the prediction that needs to be shortened: ${prediction}
  `;
}

// 7. IMPORTANT: IF YOU ADD TO THE PREDICTION MAKE ADDITIONAL EDITS TO KEEP IT THE SAME LENGTH OR SHORTER.


