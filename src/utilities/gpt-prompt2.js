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
  As a master seer, refine the prediction with intimate celestial insights and the day's 
  unique energy for ${signData}. You are also responsible for HTML tags, formatting, and shortening the prediction to 400 characters. Don't forget to add at least 
  one <br /><br /> to break paragraphs.
  Personal Data:
  - Sign: ${signData}
  - Date: ${date}
  - Time: ${time}
  - Temp: ${temp}°
  - Weather: ${description}
  - Location: ${location}
  - Day: ${day}
  - Studio: ${businessName}, ${businessLocation}
  
  Original Prediction: ${prediction}
  
  Enhance the allure for ${signData}. Transition direct data into atmospheric hints. 
  Rather than '82 degrees', evoke a 'warm embrace', moving beyond literal time and date. 
  Ensure a seamless narrative, embedding tailored astrological insights. Use <strong>, <em>, for visual charm.
   Max Output 450 characters. 
   Add at least two <br /><br /> to break paragraphs.
  Simply unveil the refined prediction, letting your cosmic insight shine. Use all Data in one way or another.
`;
}

