export function gptPrompt2(
  signData,
  date,
  time,
  temp,
  description,
  location,
  day,
  businessLocation,
  businessName,
  prediction
) {
  return `
  You are a Master Seer and Master Astrologist helping a Student Seer.
  You are tasked with making sure the students original prediction is perfect. 
  Make some small changes to enhance it following "Your checklist" with precision.

  Data the student needed to use in the original prediction:
  - Sign: ${signData}.
  - Time: ${time}.
  - Date: ${date}.
  - Temp: ${temp}°.
  - Weather: ${description}.
  - Location: ${location}.
  - Day: ${day}.
  - Yoga Studio name: ${businessName}.
  - Yoga Studio location: ${businessLocation}.
  
  Your checklist:
  1. Ensure all user data is used in the prediction in creative ways.
  2. Creatively tie in more content that identifies with the nature and tendencies of ${signData}. 
  3. Transition direct data into atmospheric hints. Rather than '82 degrees', evoke a description, moving beyond literal data. Be creative with your atmospheric hints! 
  4. Ensure a seamless narrative that flows poetically.
  5. Logically add in HTML elements <strong>, and <em> for visual charm.
  6. Shorten the prediction without losing the impact or creative data points.
  7. Logically add double line breaks with <br /><br /> to split up the prediction so the last sentence is more impactful.
  8. Only make small changes that you need to make and give it back. 

  Original Prediction: ${prediction}
  
  Show me the refined prediction, showcasing your cosmic insight without exceeding 480 chars.
`;
}
